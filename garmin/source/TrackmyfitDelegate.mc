import Toybox.Lang;
import Toybox.WatchUi;

class TrackmyfitDelegate extends WatchUi.BehaviorDelegate {

    function initialize() {
        BehaviorDelegate.initialize();
    }

    function onMenu() as Boolean {
        WatchUi.pushView(new Rez.Menus.MainMenu(), new TrackmyfitMenuDelegate(), WatchUi.SLIDE_UP);
        return true;
    }

}