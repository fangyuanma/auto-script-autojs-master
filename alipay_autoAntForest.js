const halfDeviceHeight = device.height / 2
const halfDeviceWidth = device.width / 2
const swipeDistance = 800//下滑的长度 px
const alipayPackage = "com.eg.android.AlipayGphone"
onlyRun()
function onlyRun() {
    auto()
    // launchPackage("com.eg.android.AlipayGphone")
    // sleep(2000)
    // let scan = id("saoyisao_tv").findOne();
    // className("android.widget.TextView").depth(19).text("扫一扫").packageName(alipayPackage).click()
    // click("扫一扫")
    // join("蚂蚁森林")
    // sleep(2000)
    
    // className("android.view.View").depth(13).text("查看更多好友").click()
    // sleep(2000)
    // if (text("总排行榜").exists()) {
    //     console.log('找到了')
    //     text("总排行榜").findOnce().click()
    // }
    // exit()

    run()
}
var alipay = {}
alipay.main = function () {
    toastLog("打开支付宝2")
    auto()
    run()
};

module.exports = alipay;
function run() {
    launchApp(alipayPackage,['扫一扫','付钱'])
    toastLog("尝试获取截屏权限")
    requestScreenCapture(false)

    join("蚂蚁森林")
    toastLog("开始收取能量")
    sleep(1000)

    getEnergy()
    toastLog("自己的能量收集完成")
    sleep(1000)
    toastLog("2秒后收集好友能量")
    sleep(1000)
    className("android.view.View").depth(13).text("查看更多好友").click()
    sleep(2000)

    clickTotalList()
    startCollectFriendEnergy()
    exit()
}

/**
 * 进入总排行榜
 */
function clickTotalList(){
    if (text("总排行榜").exists()) {
        text("总排行榜").findOnce().click()
        sleep(1000)
    }
}
/**
 * 进入
 * @param {*} textName 
 */
function join(textName){
    click(textName)
    sleep(3000)
}

/**
 * 下滑
 */
function startSwipe() {
    swipe(halfDeviceWidth, swipeDistance,
        halfDeviceWidth, halfDeviceHeight - 310, 30)
}

/**
 * 收集能量
 */
function getEnergy() {
    
    var img = captureScreen()
    toastLog("截图")

    // 列表可收取颜色查找
    var point = findColor(img, "#D7F964", {
        region: [200, 400,630,330],
        threshold: 4
    });
    if (point) {
        toastLog("找到啦，坐标为(" + point.x + ", " + point.y + ")")
        click(point.x, point.y);
        sleep(500)
        getEnergy()
    } else {
        toastLog("没找到")
        return
    }

    let x = 170
    let y = 400
    for (let i = 0; i < 35; i++) {
        x += 17;
        for (let j = 0; j < 15; j++) {
            press(x, y, 15);
            y += 20;
        }
        y = 400
    }
}

/**
 * 开始获取好友蚂蚁森林能量
 */
function startCollectFriendEnergy() {

    sleep(2000)
    var inviteButton = className("android.view.View").depth(17).text("邀请").findOnce();
    if (inviteButton) {
        toastLog("已经到底了,收集完成,1秒后退出程序")
        toastLog("蚂蚁森林收取完成,1秒后关闭蚂蚁森林");
        sleep(1000)
        desc("关闭").click();
        return
    } else {
        var img = captureScreen();
        toastLog("截图")

        // 列表可收取颜色查找
        var point = findColor(img, "#1F9F6E", {
            region: [940, 380],
            threshold: 4
        })
        if (point) {
            toastLog("找到啦，坐标为(" + point.x + ", " + point.y + ")")
            click(point.x, point.y);
            sleep(1500)
            getEnergy()
            back()
            sleep(2000)
        } else {
            toastLog("没找到")
        }
        startSwipe()
        startCollectFriendEnergy()
    }
}

/**
 * 打开应用
 * @param {*} appPackage 应用包名
 * @param {*} isStartedKeywords [应用首页关键字]
 */
function launchApp(appPackage,isStartedKeywords) {
    let isLauchApp = false
    while (!isLauchApp) {
        sleep(1000)
        toastLog("尝试启动")
        launchPackage(appPackage)
        sleep(3000)

        // 有一个不存在,就不是首页
        for (let i = 0; i < isStartedKeywords.length; i++) {
            if (!text(isStartedKeywords[i]).exists()) {
                isLauchApp = false
                break
            }else {
                isLauchApp = true
            }
        }
        if(!isLauchApp)
            toastLog("请手动打开软件首页")
            sleep(3000)
    }
    toastLog("已启动")
}




