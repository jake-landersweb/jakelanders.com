import 'dart:io';

import 'package:mysql_client/mysql_client.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';

import 'package:repo_scraper/logger.dart' as logger;
import 'package:repo_scraper/auth.dart' as auth;
import 'package:repo_scraper/routes.dart' as routes;
import 'package:repo_scraper/sql.dart' as sql;

// Configure routes.
final _router = Router()
  ..get('/', _rootHandler)
  ..put("/posts", routes.getPosts)
  ..get("/posts/<id>", routes.getPost)
  ..get('/rebalance', routes.scrapeRepo);

Response _rootHandler(Request req) {
  return Response.ok('Hello, World!\n');
}

void main(List<String> args) async {
  print("STARTING BLOG SERVER");

  logger.createFile();
  // check the environment
  var required = [
    "APIHOST",
    "APIPORT",
    "MYSQLHOST",
    "MYSQLPORT",
    "MYSQLUSER",
    "MYSQLPASS",
    "MYSQLDB",
    "APIKEY",
    "LOGGERPATH"
  ];
  for (var i in required) {
    if (!Platform.environment.containsKey(i)) {
      logger.critical("$i is required in the environment");
      exit(1);
    }
  }

  // add api routes
  final handler = Pipeline()
      .addMiddleware(logger.middleware())
      .addMiddleware(auth.middleware())
      .addHandler(_router);

  // get host from the environment
  final host = Platform.environment['APIHOST']!;
  final port = int.tryParse(Platform.environment["APIPORT"]!) ?? 8080;

  logger.log("Sever listening at '$host:$port'");
  await serve(handler, host, port);
}
