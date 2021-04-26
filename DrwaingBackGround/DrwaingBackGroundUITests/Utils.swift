//
//  Utils.swift
//  DrwaingBackGroundUITests
//
//  Created by Pasonatech on 2021/04/20.
//

import Foundation
import XCTest

class Utils {
    
    //app을 유지한 상태로 홈버튼을 누른 다음
    // 환경설정에서 와이파이를 on -> off, off -> on조작을 한다
    // 그 뒤에 다시 app을 재실행 한다.
    // home버튼을 누르기 전 시점으로 이동되어 있는 상태이다.
    static func wifiOnOff(){
        let app = XCUIApplication()
        sleep(1)
        XCUIDevice.shared.press(XCUIDevice.Button.home)//appを閉じらないまま、homeに移動だけ
        sleep(1)
        let setting = XCUIApplication(bundleIdentifier: "com.apple.Preferences")
        setting.activate()
        let wifi = setting.tables.cells["Wi-Fi"]
        wifi.tap()
        sleep(1)
        setting.tables.cells.switches["Wi-Fi"].tap()
        sleep(3)
        app.activate()
        sleep(1)
    }
}
