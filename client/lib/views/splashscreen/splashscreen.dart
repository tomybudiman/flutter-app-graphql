import 'package:flutter/material.dart';
import 'package:friends_app/others.dart';

typedef void FadeInCallback();

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  Future<Null> checkAuth(BuildContext context) async {
    String token = await secureStorage.read(key: "logintoken");
    if(token == null){
    }else{
      Navigator.pushReplacementNamed(context, "/home");
    }
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
                  "assets/images/church_256.png",
                  width: 56,
                  height: 56,
                ),
                Container(
                  margin: EdgeInsets.only(left: 16),
                  child: Text(
                    "GBI Sion",
                    style: TextStyle(
                      fontSize: 48,
                      letterSpacing: 1,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w300,
                      fontFamily: "RobotoCondensed",
                      color: Color.fromRGBO(100,100,100,.7),
                    ),
                  ),
                ),
              ],
            ),
            duration: 1000,
            onFadeIn: (){
              Future.delayed(Duration(milliseconds: 500), (){
                checkAuth(context);
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
