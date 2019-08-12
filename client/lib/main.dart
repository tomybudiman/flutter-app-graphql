import 'package:flutter/material.dart';

import 'package:friends_app/views/splashscreen/splashscreen.dart';
import 'package:friends_app/views/settings/settings.dart';
import 'package:friends_app/views/auth/auth.dart';
import 'package:friends_app/views/app.dart';

void main() => runApp(MaterialApp(
  home: SplashScreen(),
  routes: <String, WidgetBuilder>{
    "/auth": (BuildContext context) => Auth(),
    "/home": (BuildContext context) => Home(),
    "/settings": (BuildContext context) => Settings()
  },
));
