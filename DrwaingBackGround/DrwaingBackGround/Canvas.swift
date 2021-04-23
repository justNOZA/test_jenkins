//
//  Canvas.swift
//  BDN TTshusho
//
//  Created by Darwin Harianto on 2019/06/19.
//  Copyright © 2019 Darwin Harianto. All rights reserved.
//

import Foundation
import UIKit

class Canvas: UIView {
    
    var position = CGPoint(x: 0, y: 0)
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    // public function
    func undo() {
        _ = lines.popLast()
        setNeedsDisplay()
    }
    
    func clear() {
        lines.removeAll()
        setNeedsDisplay()
    }
    
    var lines = [[CGPoint]]()
    
    override func draw(_ rect: CGRect) {
        // custom drawing
        super.draw(rect)
        
        // サイン領域の枠線
        self.layer.borderColor = CGColor.init(gray: 1.0, alpha: 1)
        self.layer.borderWidth = 1
        
        guard let context = UIGraphicsGetCurrentContext() else { return }
        context.setFillColor(red: 0, green: 0, blue: 0, alpha: 0)
        // this is line setup
        context.setStrokeColor(UIColor.black.cgColor)
        context.setLineWidth(10)
        context.setLineCap(.butt)
        
        lines.forEach { (line) in
            for (i, p) in line.enumerated(){
                if i == 0{
                    context.move(to: p)
                } else {
                    context.addLine(to: p)
                }
            }
        }
        
        context.strokePath()
    }
    
    
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        lines.append([CGPoint]())
        
    }
    
    // track finger
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let point = touches.first?.location(in: self) else { return }
        
        guard var lastLine = lines.popLast() else { return }
        lastLine.append(point)
        
        lines.append(lastLine)
        setNeedsDisplay()
    }
}


extension UIView {
    
    // Using a function since `var image` might conflict with an existing variable
    // (like on `UIImageView`)
    func asImage() -> UIImage {
        
        let format = UIGraphicsImageRendererFormat()
        format.opaque = false
        let renderer = UIGraphicsImageRenderer(bounds: self.bounds, format: format)
        return renderer.image { rendererContext in
            layer.render(in: rendererContext.cgContext)
        }
    }
}

extension UIImage {
    func toBase64() -> String? {
        guard let imageData = self.pngData() else { return nil }
        return imageData.base64EncodedString(options: [])
    }
}
