toastLog("Start");
auto()
launchApp('中国银行')
var home = id('tv_title').className('android.widget.TextView').text('首页')

// 4s 内发现 ad 跳过
if (!home.exists()) {
    toastLog('finding skip ad')
    var skip = id('tv_timer').findOne(4000)
    if (skip == null) {
        toastLog('not find skip ad')
    } else {
        skip.click()
        toastLog('skip ad')
    }
} else {
    toastLog("is at home, don\'t need find ad")
}

// check login exit 
checkDialogLogout()

// check is in home page
while(true) {
    if (!home.exists()) {
        toastLog('finding home page')
        back()
        sleep(1000)
    } else {
        toastLog('check home is selected')
        var homeBtn =  home.findOne(1000).parent().parent()
        if (!homeBtn.isSelected()) {
            toastLog('click home Btn')
            homeBtn.click()
        } else {
            toastLog('check home is already selected')
            break;
        }
    }
}
toastLog('home page, start login')

// to login page
checkLogin()

// to activity page
id('rv_container').findOne(1000).children().forEach(child => {
    var target = child.findOne(id('iv_theme2'))
    if (target != null) {
        target.click()
        toastLog("enter education area")
    }
});

sleep(1000)
// 点击×
toastLog('点击 X')
click(495, 1530, 585, 1620)

// to slide 1
var slide = className('android.widget.Button').text('Go to slide 1').findOne(10000)
if (slide != null) {
    toastLog('click slide 1 btn')
    slide.click()
}

// className('android.widget.Image').text('7051042209761725').findOne().parent().click()

// 点击右上角签到
click(775, 89, 937, 232)

// 等待进去
className('android.widget.TextView').waitFor()
toastLog("进入鱼塘成功")

// 点击收取
sleep(2000)
click(27, 1356, 272, 1469)
toastLog("点击收取")

sleep(2000)
var sell = className('android.widget.Button')
if (sell.exists) {
    var sellBtn = sell.findOne(1000)
    if (sellBtn != null) {
        toastLog("收获成功")
        sellBtn.click()
    }
}

/**
 * check is logined
 */
function checkLogin() {
    var login = id('ivLogin').findOne(5000)
    if (login == null) {
        toastLog('can\'t find login button')
        // exit
        engines.myEngine().forceStop()
    } else {
        if (descContains("退出登录").exists()) {
            toastLog("already login")
        } else {
            // need login
            login.click()
            // slide to login
            swipeLogin()
        } 
    }
}

/**
 * swipe login
 */
function swipeLogin() {
        var swipeView = id('view_login_swipe').findOne(2000)
        var swipeRect = swipeView.bounds()
        var i = 140
        gesture(1000, [swipeRect.right - i, swipeRect.top + i], 
            [swipeRect.left + i, swipeRect.bottom - i], 
            [swipeRect.right - i, swipeRect.bottom - i])
        toastLog("login success")
}

function checkDialogLogout() {
    var loginContent = id('tv_dialog_error_content').findOne(1000)
    var loginEnter = id('btn_dialog_error_enter').findOne(1000)
    if (loginContent != null && loginEnter != null) {
        loginEnter.click()
        // to login
        swipeLogin()
    }
}
