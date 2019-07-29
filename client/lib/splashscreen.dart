import 'package:flutter/material.dart';
import 'package:gbi_sion_app/home.dart';

typedef void FadeInCallback();

class SplashScreen extends StatelessWidget {
  void navigateHome(){
  }
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
                  margin: EdgeInsets.only(left: 16),
                  child: Text(
                    "Brand Text",
                    style: TextStyle(
                      fontSize: 40,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w300,
                      fontFamily: "RobotoCondensed",
                      color: Color.fromRGBO(100,100,100,1),
                    ),
                  ),
                ),
              ],
            ),
            duration: 1000,
            onFadeIn: (){
              Future.delayed(Duration(milliseconds: 500), (){
                navigateHome();
              });
            },
          )
        ),
      ),
    );
  }
}

class FadeInSplashScreen extends StatefulWidget {
  FadeInSplashScreen({this.child, this.duration, this.onFadeIn});
  final FadeInCallback onFadeIn;
  final Widget child;
  final int duration;
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
        widget.onFadeIn();
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
