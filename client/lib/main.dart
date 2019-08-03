import 'package:flutter/material.dart';

import 'package:gbi_sion_app/splashscreen.dart';
import 'package:gbi_sion_app/home/home.dart';

void main() => runApp(MaterialApp(
  home: SplashScreen(),
  routes: <String, WidgetBuilder>{
    "/home": (BuildContext context) => Home(),
  },
));
