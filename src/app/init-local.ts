export class InitLocal {
  load() {
    if (localStorage.getItem('ad_list') === null || localStorage.getItem('ad_list') == undefined) {
      console.log('No Ad\'s Found... Creating...');
      let ad_list = [
        {
          id: 1,
          title: 'Meal Prep',
          description: 'Great guide to new country',
          author_name: 'Mark',
          created_at_datetime: '10:25:45 20.02.2019'
        },
        {
          id: 2,
          title: 'Cars',
          description: 'That\' all what we loving',
          author_name: 'Mark',
          created_at_datetime: '9:37:01 20.02.2019'
        },
        {
          id: 3,
          title: 'Weather',
          description: 'Heavy rain all abroad',
          author_name: 'Jessy',
          created_at_datetime: '8:08:56 20.02.2019'
        },
        {
          id: 4,
          title: 'Aids',
          description: 'New hope',
          author_name: 'Jessy',
          created_at_datetime: '7:08:56 20.02.2019'
        },
      ];
      let user_list = [
        {
          username: 'Mark',
          password: '12345'
        },
        {
          username: 'Jessy',
          password: 'qwerty'
        },
      ]
      localStorage.setItem('ad_list', JSON.stringify(ad_list));
      localStorage.setItem('user_list', JSON.stringify(user_list));
      localStorage.setItem('newId', '5');
      return
    } else {
      console.log('Found Ad\'s...');
    }
  }
}