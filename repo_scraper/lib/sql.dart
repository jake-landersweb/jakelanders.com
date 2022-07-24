import 'package:mysql_client/mysql_client.dart';

import 'dart:io' show Platform;

Future<MySQLConnection> createConnection() async {
  var host = Platform.environment["MYSQLHOST"]!;
  var port = int.tryParse(Platform.environment["MYSQLPORT"]!) ?? 3306;
  var user = Platform.environment["MYSQLUSER"]!;
  var pass = Platform.environment["MYSQLPASS"]!;
  var database = Platform.environment["MYSQLDB"]!;
  var secure = Platform.environment["SECURE"] ?? "false";
  final conn = await MySQLConnection.createConnection(
    host: host,
    port: port,
    userName: user,
    password: pass,
    databaseName: database,
    secure: secure == "true",
  );
  await conn.connect();
  return conn;
}
