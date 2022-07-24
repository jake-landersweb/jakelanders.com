import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';

Future<dynamic> get(String path) async {
  var client = http.Client();
  // start the response
  final response = await client.get(
    Uri(
      scheme: 'https',
      host: "api.github.com",
      path: "/repos/jake-landersweb/code_vault/git/trees/main$path",
    ),
    headers: {"unused": Uuid().v4()},
  );
  // check for basic network errors
  if (response.statusCode != 200) {
    return "error";
  }

  // return the decoded information
  return jsonDecode(response.body);
}

Future<dynamic> getRaw(String path) async {
  var client = http.Client();
  // start the response
  final response = await client.get(
    Uri(
      scheme: 'https',
      host: "raw.githubusercontent.com",
      path: "/jake-landersweb/code_vault/main$path",
    ),
    headers: {"unused": Uuid().v4()},
  );
  // check for basic network errors
  if (response.statusCode != 200) {
    return "error";
  }

  // return the decoded information
  return response.body;
}
