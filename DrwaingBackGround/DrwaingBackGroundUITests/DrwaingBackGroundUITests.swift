import XCTest

class TestSign: XCTestCase {
    
    let app = XCUIApplication()
    
    override func setUp() {
        super.setUp()
        deleteAllData()
    }
    
    // No.01-1
    func testScreenFactor(){
        let canvasElement = app.otherElements["canvas"]
        canvasElement.swipeRight()
    }
    
    // No.2
    func testMoveDraftList(){
        let window = app.windows.element(boundBy: 0)// window 화면단
        let list = app.otherElements["name"] // 해당 아이덴터티를 지닌 것 ()
        XCTAssert(window.frame.contains(list.frame))
        //윈도우의 프레임안에 해당 아이덴터티의 오브젝트 프레임이 존재하는가?
    }
    
    func testLoginError() {
        let alert = app.alerts.scrollViews.otherElements //alert 확인
        let alertMsg = alert.staticTexts.element(boundBy: 0) // alert의 메세지 확인
        XCTAssertEqual(alertMsg.label, "massage")
        let button1 = alert.buttons.element(boundBy: 0).label // alert의 버튼
        let button2 = alert.buttons.element(boundBy: 1).label // alert에 버튼이 2개 이상일때
    }
    
    func deleteAllData() {
        let app = XCUIApplication()
        app.launchArguments = ["--Reset"]
        app.launch()
    }

}
