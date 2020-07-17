## Graphic 小工具

### 安装 ： 
```
npm i aha-graphic
```

### 使用

```
// import ahasvg from 'aha-graphic'
import { Rect,RectF} from 'aha-graphic'

let rect=new Rect(
  x,y,
  width,
  height
)

let rectF=rect.mapToRectF(); // left top right bottom

//rectF.width()
//rectF.height()
//rectF.centerX()
//rectF.offset(dx, dy)
//rectF.offsetTo(newLeft, newTop)
//rectF.contains(x, y)
//rectF.scale(ratio)
//...
```

源码仓库：[https://github.com/sunshengfei/aha-graphic]