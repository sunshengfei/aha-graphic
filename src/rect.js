// MIT License

// Copyright (c) 2020 FredDon

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

class Rect {
  constructor(x, y, width, height) {
    if (arguments[0] instanceof Rect) {
      let rect = arguments[0]
      this.x = rect.x;
      this.y = rect.y;
      this.width = rect.width;
      this.height = rect.height;
    } else {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

  }

  mapToRectF() {
    return new RectF(
      this.x,
      this.y,
      this.x + this.width,
      this.y + this.height
    )
  }
}


class RectF {

  constructor(left, top, right, bottom) {
    if (arguments[0] instanceof RectF) {
      let rectF = arguments[0]
      this.left = rectF.left;
      this.top = rectF.top;
      this.right = rectF.right;
      this.bottom = rectF.bottom;
    } else {
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
    }
  }

  mapToRect() {
    let width = this.width(),
      height = this.height()
    return new Rect(
      this.left,
      this.top,
      width,
      height
    )
  }

  isEmpty() {
    return this.left >= this.right || this.top >= this.bottom;
  }

  width() {
    return this.right - this.left;
  }

  /**
   * @return the rectangle's height. This does not check for a valid rectangle
   * (i.e. top <= bottom) so the result may be negative.
   */
  height() {
    return this.bottom - this.top;
  }

  /**
   * @return the horizontal center of the rectangle. This does not check for
   * a valid rectangle (i.e. left <= right)
   */
  centerX() {
    return (this.left + this.right) * 0.5;
  }

  /**
   * @return the vertical center of the rectangle. This does not check for
   * a valid rectangle (i.e. top <= bottom)
   */
  centerY() {
    return (this.top + this.bottom) * 0.5;
  }

  /**
   * Set the rectangle to (0,0,0,0)
   */
  setEmpty() {
    this.left = this.right = this.top = this.bottom = 0;
  }

  /**
     * Offset the rectangle by adding dx to its left and right coordinates, and
     * adding dy to its top and bottom coordinates.
     *
     * @param dx The amount to add to the rectangle's left and right coordinates
     * @param dy The amount to add to the rectangle's top and bottom coordinates
     */
  offset(dx, dy) {
    this.left += dx;
    this.top += dy;
    this.right += dx;
    this.bottom += dy;
  }

  /**
   * Offset the rectangle to a specific (left, top) position,
   * keeping its width and height the same.
   *
   * @param newLeft   The new "left" coordinate for the rectangle
   * @param newTop    The new "top" coordinate for the rectangle
   */
  offsetTo(newLeft, newTop) {
    this.right += newLeft - this.left;
    this.bottom += newTop - this.top;
    this.left = newLeft;
    this.top = newTop;
  }


  /**
     * Returns true if (x,y) is inside the rectangle. The left and top are
     * considered to be inside, while the right and bottom are not. This means
     * that for a x,y to be contained: left <= x < right and top <= y < bottom.
     * An empty rectangle never contains any point.
     *
     * @param x The X coordinate of the point being tested for containment
     * @param y The Y coordinate of the point being tested for containment
     * @return true iff (x,y) are contained by the rectangle, where containment
     *              means left <= x < right and top <= y < bottom
     */
  contains(x, y) {
    return this.left < this.right && this.top < this.bottom  // check for empty first
      && x >= this.left && x < this.right && y >= this.top && y < this.bottom;
  }


  /**
     * Returns true iff the 4 specified sides of a rectangle are inside or equal
     * to this rectangle. i.e. is this rectangle a superset of the specified
     * rectangle. An empty rectangle never contains another rectangle.
     *
     * @param left The left side of the rectangle being tested for containment
     * @param top The top of the rectangle being tested for containment
     * @param right The right side of the rectangle being tested for containment
     * @param bottom The bottom of the rectangle being tested for containment
     * @return true iff the the 4 specified sides of a rectangle are inside or
     *              equal to this rectangle
     */
  contains4p(left, top, right, bottom) {
    // check for empty first
    return this.left < this.right && this.top < this.bottom
      // now check for containment
      && this.left <= left && this.top <= top
      && this.right >= right && this.bottom >= bottom;
  }

  /**
  * Returns true iff the specified rectangle r is inside or equal to this
  * rectangle. An empty rectangle never contains another rectangle.
  *
  * @param r The rectangle being tested for containment.
  * @return true iff the specified rectangle r is inside or equal to this
  *              rectangle
  */
  containsRectF(r) {
    // check for empty first
    return this.left < this.right && this.top < this.bottom
      // now check for containment
      && this.left <= r.left && this.top <= r.top
      && this.right >= r.right && this.bottom >= r.bottom;
  }

  /**
   * Scales up the rect by the given scale.
   */
  scale(scale) {
    if (scale != 1.0) {
      this.left = this.left * scale;
      this.top = this.top * scale;
      this.right = this.right * scale;
      this.bottom = this.bottom * scale;
    }
  }
}

export {
  Rect,
  RectF
}