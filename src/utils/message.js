import moment from 'moment';

export const prepareMessage = message => {
  if(!message || !message.text) {
    return message
  }
  let typeButtons = prepareMessageTypeButtons(message.text.match(/\[\[([^\]]+)\]\](\{[^\}]+\})/g));
  message.text  = message.old_text ? message.old_text : message.text;
  message.buttons   = prepareMessageButtons(message.text.match(/\[\[(.+?)\]\]\((https?:\/\/[^)]+)\)/g));
  message.pay       = typeButtons.pay_button;
  message.bookmakers= typeButtons.button_bookmaker;

  message.text      = message.text.replace(/\[\[(.+?)\]\]\((https?:\/\/[^)]+)\)/g, '');
  message.text      = message.text.replace(/\[\[(.+?)\]\]{(.+?)}/g, '');
  message.text      = message.text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  message.text      = message.text.replace(/_(.*?)_/g, '<em>$1</em>');
  message.text      = message.text.replace(/\[(.+?)\]\((instruction)\)/g, '<a href="#" class="how-redirect">$1</a>');
  message.text      = message.text.replace(/\[(.+?)\]\((obuchenie)\)/g, '<a href="#" class="learn-redirect">$1</a>');
  message.text      = message.text.replace(/\[(.+?)\]\((https?:\/\/[a-zA-Z0-9/\W.(]+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  message.text      = message.text.replace(/\[(.+?)\]\((tg?:\/\/[a-zA-Z0-9/=?.(]+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  message.text      = message.text.replace(/\[(.+?)\]\(([a-zA-Z0-9\W.(]+?)\)/g, '<a href="#">$1</a>');
  message.text      = message.text.replace(/\n/g, '<br>');
  message.text      = message.text.replace(/(?:@)(\w+)/g, '<button class="alias-link" type="button">@$1</button>');
  message.text      = message.text.trim();
  message.human     = {
    date: moment.unix(message.time).format('DD.MM.YY'),
    time: moment.unix(message.time).format('HH:mm'),
  };
  return message;
};

export const preparePreview = text => {
  text = text.replace(/\[\[(.+?)\]\]\((https?:\/\/[^)]+)\)/g, '$1');
  text = text.replace(/\[\[(.+?)\]\]{(.+?)}/g, '$1');
  text = text.replace(/\[\[(.+?)\]\]{(.+?)}/g, '');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/_(.*?)_/g, '$1');
  text = text.replace(/\[(.+?)\]\((instruction)\)/g, '$1');
  text = text.replace(/\[(.+?)\]\((obuchenie)\)/g, '$1');
  text = text.replace(/\[(.+?)\]\((https?:\/\/[a-zA-Z0-9/\W.(]+?)\)/g, '$1');
  text = text.replace(/\[(.+?)\]\((tg?:\/\/[a-zA-Z0-9/=?.(]+?)\)/g, '$1');
  text = text.replace(/\[(.+?)\]\(([a-zA-Z0-9\W.(]+?)\)/g, '$1');
  text = text.replace(/\n/g, '');
  text = text.replace(/(?:@)(\w+)/g, '@$1');
  text = text.replace('<br>', '');
  return text;
};

const prepareMessageButtons = buttons => {
  const result = [];

  if (buttons === null) return [];
  for (let i = 0; i < buttons.length; i++) {
    result.push({
      text  : buttons[i].replace(/\[\[(.+?)\]\]\((https?:\/\/[^)]+)\)/g, "$1"),
      url   : buttons[i].replace(/\[\[(.+?)\]\]\((https?:\/\/[^)]+)\)/g, "$2"),
    });
  }

  return result;
};

const prepareMessageTypeButtons = buttons => {
  let result = {
    button_bookmaker: [],
    pay_button: []
  };
  const availableTypes = ['button_bookmaker', 'pay_button'];
  if (buttons === null) return result;
  buttons.forEach(button => {
      let buttonObj = {
        text: button.replace(/\[\[([^\]]+)\]\](\{[^\}]+\})/g, "$1"),
        data: JSON.parse(button.replace(/\[\[([^\]]+)\]\](\{[^\}]+\})/g, "$2") ),
      };
      if(buttonObj.data.type && availableTypes.includes(buttonObj.data.type)) {
        result[buttonObj.data.type].push(buttonObj);
      }
  });

  return result;
};

export const compareTimeDesc = ( a, b ) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0;