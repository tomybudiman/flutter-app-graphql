import 'package:flutter/material.dart';

class MyPopupMenuItem extends StatelessWidget {
  MyPopupMenuItem({this.icon, this.label});
  final String label;
  final IconData icon;
  @override
  Widget build(BuildContext context) {
    return Flex(
      direction: Axis.horizontal,
      children: <Widget>[
        Container(
          child: Icon(icon,
            color: Color.fromRGBO(100,100,100,.6),
            size: 20,
          ),
          margin: EdgeInsets.only(right: 8),
        ),
        Text(label,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.normal,
            color: Color.fromRGBO(100,100,100,1)
          ),
        )
      ],
    );
  }
}


class HomeAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      actions: <Widget>[
        PopupMenuButton(
          offset: Offset(0, 8),
          icon: Icon(
            Icons.menu,
            color: Color.fromRGBO(100,100,100,.6),
            size: 28,
          ),
          itemBuilder: (BuildContext context) => [
            PopupMenuItem(child: MyPopupMenuItem(
              icon: Icons.account_circle,
              label: "Login",
            )),
            PopupMenuItem(child: MyPopupMenuItem(
              icon: Icons.settings,
              label: "Settings",
            ))
          ],
        )
      ],
      backgroundColor: Color.fromRGBO(255,255,255,1),
      title: Text(
        "Friends!",
        style: TextStyle(
          fontSize: 28,
          letterSpacing: 1,
          fontWeight: FontWeight.w300,
          fontFamily: "RobotoCondensed",
          color: Color.fromRGBO(100,100,100,1),
        ),
      ),
    );
  }
}