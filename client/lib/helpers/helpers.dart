import 'package:flutter/material.dart';

// ignore: non_constant_identifier_names
Color HexToColor(String code){
  return Color(int.parse(code.substring(1, 7), radix: 16) + 0xFF000000);
}