class GitObject {
  late String path;
  late String mode;
  late String type;
  late String sha;
  late int? size;
  late String url;

  GitObject({
    required this.path,
    required this.mode,
    required this.type,
    required this.sha,
    this.size,
    required this.url,
  });

  GitObject.fromJson(dynamic json) {
    path = json['path'];
    mode = json['mode'];
    type = json['type'];
    sha = json['sha'];
    size = json['size'];
    url = json['url'];
  }

  Map<String, dynamic> toJson() {
    return {
      "path": path,
      "mode": mode,
      "type": type,
      "sha": sha,
      "size": size,
      "url": url,
    };
  }
}

class PostObject {
  late int id;
  late String title;
  late String description;
  late String endpoint;
  String? imageUrl;
  late String tags;
  String? video;
  String? gitLink;

  PostObject({
    required this.id,
    required this.title,
    required this.description,
    required this.endpoint,
    this.imageUrl,
    required this.tags,
    this.video,
    this.gitLink,
  });

  PostObject.fromJson(dynamic json) {
    id = json['id'];
    title = json['title'];
    description = json['description'];
    endpoint = json['endpoint'];
    imageUrl = json['imageUrl'];
    tags = json['tags'];
    video = json['video'];
    gitLink = json['gitLink'];
  }
}
