const Node = require('./node');

class LinkedList {
    constructor() {
      this._head = null;
      this._tail = null;
      this.length = 0;
    }

    append(data) {
      let newElement = new Node(data);
      if (this._head == null) {
        this._head = newElement;
        this._tail = newElement;
      } else {
        newElement.prev = this._tail;
        this._tail.next = newElement;
        this._tail = newElement;
      }
      this.length++;
      return this;
    }

    head() {
      if (this._head == null) return null;
      return this._head.data;
    }

    tail() {
      if (this._tail == null) return null;
      return this._tail.data;
    }

    at(index) {
      let i = 0;
      let currentElement = this._head;
      while (currentElement != null) {
        if (i == index) return currentElement.data;
        currentElement = currentElement.next;
        i++;
      }
    }

    insertAt(index, data) {
      let currentElement = this._head;
      let currentIndex = 1;
      let newElement = new Node(data);
      while (currentElement != null) {
        currentElement = currentElement.next;
        if (currentIndex == index) {
          currentElement.prev.next = newElement;
          newElement.prev = currentElement.prev;
          newElement.next = currentElement;
          currentElement.prev = newElement;
          this.length++;
          return;
        }
        currentIndex++;
      }
      return this;
    }

    isEmpty() {
      if (this.length > 0) return false;
      return true;
    }

    clear() {
      this._head = null;
      this._tail = null;
      this.length = 0;
      return this;
    }

    deleteAt(index) {
      let currentElement = this._head;
      let currentIndex = 0;
      while (currentElement != null) {
        if (currentIndex == index) {
          if (currentElement == this._head && currentElement == this._tail) {
            this._head = null;
            this._tail = null;
            this.length = 0;
            return this;
          }
          if (currentElement == this._head) {
            this._head = this._head.next;
            this._head.prev = null;
          } else if (currentElement == this._tail) {
            this._tail = this._tail.prev;
            this._tail.next = null;
          } else {
            currentElement.prev.next = currentElement.next;
            currentElement.next.prev = currentElement.prev;
          }
        }
        currentIndex++;
        currentElement = currentElement.next;
      }
      this.length--;
      return this;
    }

    reverse() {
      let currentElement = this._head;
      let preCurrentElement = null;
      while (currentElement != null) {
        let afterCurrentElement = currentElement.next;
        currentElement.next = preCurrentElement;
        currentElement.prev = afterCurrentElement;
        preCurrentElement = currentElement;
        currentElement = afterCurrentElement;
      }
      let tail = this._tail;
      this._tail = this._head;
      this._head = tail;
      return this;
    }

    indexOf(data) {
      let currentElement = this._head;
      let currentIndex = 0;
      while (currentElement != null) {
        if (currentElement.data == data) {
          return currentIndex;
        }
        currentIndex++;
        currentElement = currentElement.next;
      }
      return -1;
    }
}

module.exports = LinkedList;
