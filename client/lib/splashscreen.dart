import 'package:flutter/material.dart';
import 'package:gbi_sion_app/home.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        color: Colors.white,
        child: Align(
          alignment: Alignment.center,
          child: FadeInSplashScreen(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Image.asset(
                  "images/default_logo_256.png",
                  width: 56,
                  height: 56,
                ),
                Container(
                  margin: EdgeInsets.only(
                      left: 16
                  ),
                  child: Text(
                    "Brand Text",
                    style: TextStyle(
                      fontSize: 40,
                      color: Color.fromRGBO(100,100,100,1),
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w300,
                      fontFamily: "RobotoCondensed",
                    ),
                  ),
                ),
              ],
            ),
            duration: 1000,
          )
        ),
      ),
    );
  }
}

class FadeInSplashScreen extends StatefulWidget {
  final Widget child;
  final int duration;
  FadeInSplashScreen({@required this.child, this.duration});
  @override
  _FadeInSplashScreenState createState() => _FadeInSplashScreenState();
}

class _FadeInSplashScreenState extends State<FadeInSplashScreen> with TickerProviderStateMixin {
  AnimationController controller;
  Animation animation;
  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: widget.duration)
    );
    animation = Tween(
      begin: 0.0,
      end: 1.0
    ).animate(controller);
    animation.addStatusListener((status){
      if(AnimationStatus.completed == status){
        // If fade in transition animation completed
      }
    });
    controller.forward();
  }
  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: animation,
      child: widget.child,
    );
  }
}
