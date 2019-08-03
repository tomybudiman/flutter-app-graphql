import 'package:flutter/material.dart';

import 'package:friends_app/views/splashscreen/splashscreen.dart';
import 'package:friends_app/views/app.dart';

void main() => runApp(MaterialApp(
  home: SplashScreen(),
  routes: <String, WidgetBuilder>{
    "/home": (BuildContext context) => Home(),
  },
));
