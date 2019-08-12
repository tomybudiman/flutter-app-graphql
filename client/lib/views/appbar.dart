import 'package:flutter/material.dart';
import 'package:friends_app/helpers/helpers.dart';

class MyPopupMenuItem extends StatelessWidget {
  MyPopupMenuItem({this.icon, this.label});
  final String label;
  final IconData icon;
  @override
  Widget build(BuildContext context) {
    return Flex(
      crossAxisAlignment: CrossAxisAlignment.center,
      direction: Axis.horizontal,
      children: <Widget>[
        Container(
          child: Icon(
            icon,
            color: HexToColor("#74b9ff"),
            size: 20,
          ),
          margin: EdgeInsets.only(right: 12),
        ),
        Text(
          label,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.normal,
            color: HexToColor("#636e72")
          ),
        )
      ],
    );
  }
}

class MyAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
  @override
  Widget build(BuildContext context) {
    return AppBar(
      automaticallyImplyLeading: false,
      actions: <Widget>[
        PopupMenuButton(
          elevation: 16,
          offset: Offset(0, 8),
          icon: Icon(
            Icons.menu,
            color: HexToColor("#74b9ff"),
            size: 28,
          ),
          onSelected: (test){
            switch(test){
              case "login":
                break;
              case "settings":
                Navigator.pushNamed(context, "/settings");
                break;
            }
          },
          itemBuilder: (BuildContext context) => [
            PopupMenuItem(
              value: "login",
              child: MyPopupMenuItem(
                icon: Icons.account_circle,
                label: "Login",
              )
            ),
            PopupMenuItem(
              value: "settings",
              child: MyPopupMenuItem(
                icon: Icons.settings,
                label: "Settings",
              )
            )
          ],
        )
      ],
      backgroundColor: Colors.white,
      title: Text(
        "App Bar",
        style: TextStyle(
          fontSize: 28,
          letterSpacing: 1,
          fontWeight: FontWeight.w300,
          fontFamily: "RobotoCondensed",
          color: HexToColor("#636e72"),
        ),
      ),
    );
  }
}

class MyBottomTabItem extends StatelessWidget {
  MyBottomTabItem({this.label});
  final String label;
  @override
  Widget build(BuildContext context) {
    return Tab(
      child: Text(
        label,
        style: TextStyle(
          fontSize: 16,
          fontFamily: "RobotoCondensed",
          color: HexToColor("#74b9ff")
        ),
      ),
    );
  }
}

class MyBottomAppBar extends StatefulWidget {
  @override
  _MyBottomAppBarState createState() => _MyBottomAppBarState();
}

class _MyBottomAppBarState extends State<MyBottomAppBar> with SingleTickerProviderStateMixin {
  TabController tabController;
  static final myTabs = <Widget>[
    MyBottomTabItem(label: "Home"),
    MyBottomTabItem(label: "Events")
  ];
  @override
  void initState(){
    super.initState();
    tabController = TabController(
      length: myTabs.length,
      vsync: this
    );
  }
  @override
  void dispose(){
    super.dispose();
    tabController.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            blurRadius: 20,
            spreadRadius: 5,
            offset: Offset(0,25),
            color: Color.fromRGBO(100,100,100,.5)
          )
        ]
      ),
      child: TabBar(
        tabs: myTabs,
        indicatorWeight: 4,
        controller: tabController,
        labelPadding: EdgeInsets.only(top: 4, bottom: 4),
        indicatorColor: HexToColor("#74b9ff")
      )
    );
  }
}