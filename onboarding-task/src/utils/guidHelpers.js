

class GuidHelpers {

  static guid(argument) {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4() + (argument ? ('-' + argument) : '');
  }

  static getArgumentFromGuid(guid) {
    const parts = guid.split('-');
    return parts.length === 6 ? parts.pop() : undefined;
  }
}

export default GuidHelpers;
