class Dictionary {
  constructor() {
    this.list = [];
  }

  define(_list) {
    this.list = this.list
      .reverse()
      .concat(_list)
      .reverse();
  }
}

export default new Dictionary();
