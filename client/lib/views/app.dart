import 'package:flutter/material.dart';

import 'package:friends_app/views/appbar.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: Scaffold(
        appBar: MyAppBar()
      ),
    );
  }
}


