import 'dart:convert';
import 'dart:developer';

import 'package:mysql_client/mysql_client.dart';
import 'package:shelf/shelf.dart';
import 'package:repo_scraper/logger.dart' as logger;
import 'package:repo_scraper/response.dart' as response;
import 'package:repo_scraper/sql.dart' as sql;
import 'package:repo_scraper/client.dart' as client;
import 'package:repo_scraper/objects.dart';
import 'package:yaml/yaml.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:intl/intl.dart';

Future<Response> getPosts(Request request) async {
  try {
    final rawData = await request.readAsString();
    Map<String, dynamic> body = jsonDecode(rawData);

    // create the connection
    MySQLConnection conn = await sql.createConnection();

    int pageSize = body['pageSize'] ?? 10;
    int page = body['page'] ?? 1;
    String? searchText = body['searchText'];
    String? tag = body['tag'];

    IResultSet results = await conn.execute(
      "SELECT * FROM posts ${searchText == null ? tag == null ? "" : "WHERE tags LIKE '%$tag%'" : "WHERE title LIKE '%$searchText%' OR description LIKE '%$searchText%' OR tags LIKE '%$searchText%'"} ORDER BY id DESC LIMIT ${((page - 1) * pageSize)},$pageSize",
    );

    IResultSet total = await conn.execute("SELECT COUNT(*) FROM posts");

    Map<String, dynamic> responsebody = {
      "posts": [],
      "lastIndex": 1,
      "page": page += 1,
      "total": total.rows.map((e) => e.typedAssoc()["COUNT(*)"]).toList()[0]
    };

    DateFormat formatter = DateFormat("E, MMMM d y");
    for (var i in results.rows) {
      Map<String, dynamic> row = i.typedAssoc();
      var date = DateTime.parse(row['created']);
      row['created'] = formatter.format(date);
      responsebody['lastIndex'] = row['id'];
      responsebody['posts'].add(row);
    }

    responsebody['hasMore'] = responsebody['lastIndex'] != 1;

    conn.close();
    return response.success(
      "Successfully found posts",
      object: responsebody,
    );
  } catch (error, stacktrace) {
    logger.error(error.toString(), stacktrace: stacktrace.toString());
    return response.error(
      "There was an exception in the request. Check the logs.",
    );
  }
}

Future<Response> getPost(Request request) async {
  try {
    var id = request.params['id'];

    MySQLConnection conn = await sql.createConnection();

    var resp = await conn.execute(
      "SELECT * FROM posts WHERE id = :id",
      {"id": id},
    );

    DateFormat formatter = DateFormat("E, MMMM d y");
    var row = resp.rows.toList()[0].typedAssoc();
    var date = DateTime.parse(row['created']);
    row['created'] = formatter.format(date);
    var date2 = DateTime.parse(row['updated']);
    row['updated'] = formatter.format(date2);

    conn.close();
    return response.success(
      "Successfully found post",
      object: row,
    );
  } catch (error, stacktrace) {
    logger.error(error.toString(), stacktrace: stacktrace.toString());
    return response.error(
      "There was an exception in the request. Check the logs.",
    );
  }
}

Future<Response> scrapeRepo(Request request) async {
  try {
    // create a mysql connection
    MySQLConnection conn = await sql.createConnection();

    // get the root repo content
    var r = await client.get("");
    if (r == "error") {
      logger.error("There was an issue with the github api");
      return response.error("There was an issue with the github api");
    }

    for (var i in r['tree']) {
      GitObject rootObj = GitObject.fromJson(i);
      // check if name !begins with _ and type is tree
      if (!rootObj.path.startsWith("_") && rootObj.type == "tree") {
        // get the config for the post
        var raw = await client.getRaw("/${rootObj.path}/config.yaml");
        // add the post if the record does not already exist

        var yml = loadYaml(raw);

        print("LOADED YAML = $yml");

        var title = yml['title'];
        var description = yml['description'];
        var endpoint =
            "https://raw.githubusercontent.com/jake-landersweb/code_vault/main/${rootObj.path}";
        var image = yml['image'];
        var tags = yml['tags'];

        var body = {
          "title": title,
          "description": description,
          "endpoint": endpoint,
          "image": image,
          "tags": tags,
        };

        logger.log(body.toString());

        // check if article already exists
        var results = await conn
            .execute("SELECT title FROM posts WHERE title = '$title'");

        if (results.rows.isEmpty) {
          logger.log("Creating new record");
          // create new record
          await conn.execute(
            "INSERT INTO posts (title, description, endpoint, imageUrl, tags) VALUES (:title, :description, :endpoint, :image, :tags)",
            body,
          );
        } else {
          logger.log("Updating the existing record");
          // update record
          await conn.execute(
            "UPDATE posts SET description = :description, endpoint = :endpoint, imageUrl = :image, tags = :tags WHERE title = :title",
            body,
          );
        }
      }
    }

    conn.close();
    return response
        .success("Successfully rebalanced database insync with the repo");
  } catch (error, stacktrace) {
    logger.error(error.toString(), stacktrace: stacktrace.toString());
    return response.error(
      "There was an exception in the request. Check the logs.",
    );
  }
}
