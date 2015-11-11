function addSequence(txt, fun) {
  var list = txt.split(fun);
  var line = '';

  for(var nr in list) {
    if (line != '') {
      line = '(' + line + ')' + fun + '(' + list[nr] + ')';
    } else {
      line = list[nr];
    }
  }
  return line;
}

var keys = {
  37: '%',
  40: '(',
  41: ')',
  42: ' * ',
  43: ' + ',
  45: ' - ',
  46: '.',
  47: ' / ',
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  67: 'cos(',
  77: ' mod ',
  83: 'sin('
};

var vm = new Vue({
  el: '#calc',
  data: {
    screen: '',
    result: 0,
    histories: []
  },
  methods: {
    keyup: function() {

console.log('keyIdentifier: ' + this.$event.keyIdentifier);

      var keyIdentifier = this.$event.keyIdentifier;
      if (keyIdentifier === 'Enter') {
          // calculate when pushing enter key
          return this.calculate();
      }

      var match = keyIdentifier.match(/^U\+(.+)$/);
      if (match && match.length) {
        var key = parseInt(match[1], 16);

console.log('key: ' + key);

        if (key === 8 || key === 27) {  // back space or escape
          this.reset();
        } else if (key === 61) {        // equal
          this.calculate();
        } else if (key in keys) {
          this.put(keys[key]);
        }
      }
    },
    put: function(value) {
      this.screen += value;
    },
    calculate: function() {
      var replacedScreen = this.screen.replace('%', '/100', 'g');
      replacedScreen = replacedScreen.replace('mod', '%', 'g');
      replacedScreen = addSequence(replacedScreen, '%');
      replacedScreen = replacedScreen.replace('sin', 'Math.sin');
      replacedScreen = replacedScreen.replace('cos', 'Math.cos');

console.log('replaced screen: ' + replacedScreen);

      try { this.result = eval(replacedScreen) }
      catch (e) { this.result = e }

      this.histories.unshift(this.screen + ' = ' + this.result);
    },
    reset: function() {
      this.screen = '';
      this.result = 0;
      this.histories = [];
    }
  }
});

