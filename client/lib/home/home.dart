import 'package:flutter/material.dart';
import 'package:gbi_sion_app/home/appbar.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: Scaffold(
        appBar: HomeAppBar()
      ),
    );
  }
}


