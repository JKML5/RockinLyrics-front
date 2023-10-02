const songs = [
  {
    id: 28,
    title: 'Gold on the Ceiling',
    artist: 'The Black Keys',
    tutorials: [
      {
        id: '1Xl_GCU3AEr1L4CpUz7aHbzjGGyF-fCyR',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1gcsEHh2bkVp1U0UGdQSKw-JWUNTyeQ2O',
        title: 'Tuto LEAD F',
        type: 'audio',
        gender: 'F',
        category: ['LEAD'],
      },
      {
        id: '159P3vUmshNQpxUF9KbngDvhXUm2MfNUs',
        title: 'Tuto BV1&BV2 F',
        type: 'audio',
        gender: 'F',
        category: ['BV1', 'BV2'],
      },
      {
        id: '1Q3Mt3gAFmkHPr16XdDa_V_kItYKuoBXm',
        title: 'Paroles M',
        type: 'lyrics',
        gender: 'M',
        category: ['LEAD', 'BV1', 'BV2'],
      },
      {
        id: '1umfL1TPgmORQZAq-ywxNHvgELFN2JyEQ',
        title: 'Paroles LEAD F',
        type: 'lyrics',
        gender: 'F',
        category: ['LEAD'],
      },
      {
        id: '1Ot9nqx_OYIjRSF6kf7JUGBdIwKIedsmY',
        title: 'Paroles BV1&BV2 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV1', 'BV2'],
      },
    ],
  }, // 28 - Gold on the Ceiling - The Black Keys
  {
    id: 2,
    title: 'Antisocial',
    artist: 'Trust',
    tutorials: [
      {
        id: '18EFRFNrHZSusSO0yPVUd07g1VaHGXMXZ',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1HRzws-PYss0pUv1DpFRclGYiyBGmB_io',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1Gd_96PTT-HLdEqCtUwfLfbdUMokq2GuD',
        title: 'Tutoriel F',
        type: 'audio',
        gender: 'F',
      },
      {
        id: '151NW9SN-IrrwHDYEUWzFqCuto5eCbKWg',
        title: 'Lyrics ALL M',
        type: 'lyrics',
        gender: 'M',
      },
      {
        id: '1DWsOX1FinGT5W4Cguimk79y1_X4ZhXmh',
        title: 'Lyrics ALL F',
        type: 'lyrics',
        gender: 'F',
      },
    ],
  }, // 2 - Antisocial - Trust
  {
    id: 10,
    title: 'Killing in the Name',
    artist: 'Rage against the Machine',
    tutorials: [
      {
        id: '18V8DPgeo6zTCMx2EXhvjbYH8-ZtFZWn0',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1Zsv1oG__Z1VVfaBVgfd-oSU7RqTJm_Kk',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1Uwwy4HCX8rDXmZNsnjP4eTjbB_a2VESZ',
        title: 'Tutorial LEAD M',
        type: 'lyrics',
        gender: 'M',
        category: ['LEAD'],
      },
      {
        id: '17Z0wh9m7ZEFS4shKoxSn-qt-YNEBJHtq',
        title: 'Tutorial BV1 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV1'],
      },
      {
        id: '1X-GIT-AjuVWKLRaw8lZx5nfE9LYtQfkg',
        title: 'Tutorial BV2 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV2'],
      },
      {
        id: '1Mdo87CEgtHGmKMVtmcBt_oQpEEY2CAcf',
        title: 'Tutorial LEAD F',
        type: 'lyrics',
        gender: 'F',
        category: ['LEAD'],
      },
      {
        id: '1McHEm5h3GcocYdC1R7_9oK4rms4TpCqE',
        title: 'Tutorial BV1 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV1'],
      },
      {
        id: '1MbeBSDkwk4xD1Jv8NAHEd0Gk_424g8EY',
        title: 'Tutorial BV2 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV2'],
      },
    ],
  }, // 10 - Killing in the Name - Rage against the Machine
  {
    id: 17,
    title: 'Drum Battle + Song 2',
    artist: 'Blur',
    tutorials: [
      {
        id: '1AL_O58Yv5crtQeJjzxrsybqBN_bPBrYJ',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1v25wUSiVWgzt4Z2ZqUia991jk9ANGDKf',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1HBA5HUWpr_EZIYAo_WVse4WR40SdGeFS',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 17 - Song 2 - Blur
  {
    id: 31,
    title: 'Space Oddity',
    artist: 'David Bowie',
    tutorials: [
      {
        id: '10euZCFjDG1vZ-5qHhImWnXNiRRRZiolE',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1pTWU-uNp1_uLEU6DlttsRAq9Co_iUFjw',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1lPizMnei5EwZGzMfCqNuWYbXUtsteVBo',
        title: 'Tutorial BV1 & BV2 F',
        type: 'audio',
        gender: 'F',
        category: ['BV1', 'BV2'],
      },
      {
        id: '1qC-SdshSXRdy9GOV_uw78_YCizriFWIN',
        title: 'Tutorial BV1 & BV2 M',
        type: 'audio',
        gender: 'M',
        category: ['BV1', 'BV2'],
      },
      {
        id: '17UA-qZW4pQews36UjKSfM3LKcvynd2Mk',
        title: 'Paroles',
        type: 'lyrics',
        category: ['LEAD'],
      },
      {
        id: '1R5MBohEOgFD-IY1grDiDXf1o14-vqnvh',
        title: 'Paroles M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV1', 'BV2'],
      },
      {
        id: '1bzpyoA4fUg2KqPy7Q1_iPk5JOMWtmQqu',
        title: 'Paroles F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV1', 'BV2'],
      },
    ],
  }, // 31 - Space Oddity - David Bowie
  {
    id: 35,
    title: "C'est Comme Ca",
    artist: 'Les Rita Mitsouko',
    tutorials: [
      {
        id: '1-pffXLGFefifC01FWxSzSTBz98DyLrln',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1L5YCZA-LhSEmrKUj22PPu3mjUYFA6zbp',
        title: 'Click Track VOX',
        type: 'audio',
      },
      {
        id: '1nI_FIv-Xm1eDs94ZRKBeQxC7d28CkUoW',
        title: 'Paroles M',
        type: 'lyrics',
        gender: 'M',
      },
      {
        id: '1PBdz4g1gqUBpqncIull6NHRduxL0DWAV',
        title: 'Paroles F',
        type: 'lyrics',
        gender: 'F',
      },
    ],
  }, // 35 - C'est Comme Ca - Les Rita Mitsouko
  {
    id: 36,
    title: 'The Final Countdown',
    artist: 'Europe',
    tutorials: [
      {
        id: '1aIzyFCLeeIzlcDty9ss93FVD4WdPE5wn',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1T1AY0RaSIYMWmOrutLZxDV82h9_U4wGn',
        title: 'Click Track - Full',
        type: 'audio',
      },
      {
        id: '1npfax-5nij4aLOnbKnJDK6TjPw-_9piJ',
        title: 'Paroles (provisoire)',
        type: 'lyrics',
      },
    ],
  }, // 36 - The Final Countdown - Europe
  {
    id: 22,
    title: 'We Are Thousand',
    artist: 'Yaovann',
    tutorials: [
      {
        id: '12bYv4Lo2G8Hf1crOIMK6Za5xu0vdHph0',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1fwzn9bh1L7JUjVG3e1SGbTPDgd1P6kbO',
        title: 'Click Track - Full',
        type: 'audio',
      },
      {
        id: '1r5uwmGg_TkTN-FVftNcKTmrSHE0E0fRV',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 22 - We Are Thousand - Yaovann
  {
    id: 37,
    title: 'Learn To Fly',
    artist: 'Foo Fighters',
    tutorials: [
      {
        id: '12slHjQxpTqh69YIbrozike6W7DeI3ZyP',
        title: 'Original song',
        type: 'audio',
      },
      {
        id: '1MvqU35d6-5WtNvzuGqdYoEAWz9fc-bDW',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1Mx7iqOiqBOHLIbCp0ZmoIULQWMYHPmwT',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 37 - learn to fly - Foo Fighters
  {
    id: 13,
    title: 'Shoot to trill',
    artist: 'AC/DC',
    tutorials: [
      {
        id: '1GkF5IF-QPrn6gXmoJKVh_u6oLqfSP7vC',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1s1L6GS0WNHtN7WWFJLrc43lSSyXj5c8I',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1PvwVx4BDi079mofdb9pAtbiFnjcVH8Wp',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 13 - Shoot to trill - AC/DC
  {
    id: 30,
    title: 'Lithium',
    artist: 'Nirvana',
    tutorials: [
      {
        id: '1bF9iYXH-SBlTk-2jh_yXBuBVjuPPgVIG',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '100bPPFArpr0MJw_L89LYRqo74nj91mc7',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1dbBDuoqjy041fzJk66b5r3_6y639GJWE',
        title: 'Tutorial  M',
        type: 'audio',
        gender: 'M',
        category: ['LEAD', 'BV1', 'BV2'],
      },
      {
        id: '1IJSOAFNjeDHTXcJQNx5LSR1tvZi6o4u7',
        title: 'Tutorial  F',
        type: 'audio',
        gender: 'F',
        category: ['LEAD', 'BV1', 'BV2'],
      },
      {
        id: '1au81AozaMHMK7dN9PRiycYpOo-Oa8fXv',
        title: 'Paroles M',
        type: 'lyrics',
        gender: 'M',
        category: ['LEAD', 'BV1', 'BV2'],
      },
      {
        id: '10soOs_JJz_boY8jG-1t_k9QAgPUW-WfZ',
        title: 'Paroles  F',
        type: 'lyrics',
        gender: 'F',
        category: ['LEAD', 'BV1', 'BV2'],
      },
    ],
  }, // 30 - Lithium - Nirvana
  {
    id: 38,
    title: 'Sympathy For The Devil',
    artist: 'The Rolling Stones',
    tutorials: [
      {
        id: '1Ht54RASMQ09IBL9Bd9OoIeCkxHelYx2H',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1VgecNZHlPfadLUXOnu21127y1q7gfbCK',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1zMBMyaqDwmDnskXenouDZR6PrKxqxjza',
        title: 'Tutorial LEAD',
        type: 'audio',
        category: ['LEAD'],
      },
      {
        id: '1iRhGKeBr15Fzc8P2G6oI6CRPz93ZxqpC',
        title: 'Tutorial BV1 & BV2',
        type: 'audio',
        category: ['BV1', 'BV2'],
      },
      {
        id: '1GsYX-Za9aUQNgPki8AuLewHxzXGCPm7Z',
        title: 'Lyrics LEAD',
        category: ['LEAD'],
        type: 'lyrics',
      },
      {
        id: '13DRf_93v86XfMnQ9VQA5EXxJ8b9UQs21',
        title: 'Lyrics BV1 & BV2',
        type: 'lyrics',
        category: ['BV1', 'BV2'],
      },
    ],
  }, // 38 - Sympathy For The Devil - The Rolling Stones
  {
    id: 39,
    title: 'Another Brick In The Wall (part 2)',
    artist: 'Pink Floyd',
    tutorials: [
      {
        id: '1tg0PHJGu_w4pKdYVIPMgD2lRERUMUsX-',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1z_-_QYztI87qvoXf5pn8qJPZjrFgcUaZ',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1b2uFJPolKSUiOkH6i_J9eqRp7qpdhDWu',
        title: 'Paroles M',
        type: 'lyrics',
        gender: 'M',
      },
      {
        id: '13dLd_sMqUdXsYUO3YkFD9JuRlc-9ZqJL',
        title: 'Paroles F',
        type: 'lyrics',
        gender: 'F',
      },
    ],
  }, // 39 - Another Brick In The Wall (part 2) - Pink Floyd
  {
    id: 40,
    title: 'My Hero',
    artist: 'Foo Fighters',
    tutorials: [
      {
        id: '1mKRXdnqYUigZdo_t1yVD7l31XRFMhLaK',
        title: 'Chanson originale',
        icon: 'music',
        type: 'audio',
      },
      {
        id: '1PcmTf_v5TFIKW5Vkf0PxZFX2VJTnE-5v',
        title: 'Click Track - VOX',
        icon: 'voice',
        type: 'video',
      },
      {
        id: '1wlmegWPjaY9LcireUC97yBIS-em05Eiq',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 40 - My Hero - Foo Fighters
  {
    id: 23,
    title: 'Where is My mind ?',
    artist: 'The Pixies',
    tutorials: [
      {
        id: '1g_YWY5hR6_n03C-H1C4WAfg9WuKqNXwc',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1lE6G44cJ6dTMRq9v10Idl_WAcJ2YplZk',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1JN6SoB2RuXir5IcjGIp4uC6UeNhdMBYB',
        title: 'Tuto BV1 F',
        type: 'video',
        gender: 'F',
        category: ['BV1'],
      },
      {
        id: '1oMJla90jt7jD8CF8-OEYPmCLGV011YE8',
        title: 'Tuto BV2 F',
        type: 'video',
        gender: 'F',
        category: ['BV2'],
      },
      {
        id: '19fE19cY-11h6og8IGx-CMs_T9r1wvffe',
        title: 'Paroles LEAD M',
        type: 'lyrics',
        gender: 'M',
        category: ['LEAD'],
      },
      {
        id: '1ren7CzZOfbEa_pa2eHunm1XMqFdX1NnW',
        title: 'Paroles LEAD F',
        type: 'lyrics',
        gender: 'F',
        category: ['LEAD'],
      },
      {
        id: '1U0UH0shFMiQXXxKvcY6syIz_0hvQ_Zz5',
        title: 'Paroles BV1 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV1'],
      },
      {
        id: '17g71aAq1APybRpYPD9WdAd9QmyAcDI9d',
        title: 'Paroles BV1 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV1'],
      },
      {
        id: '19eaYk1DZtml5M6ND8LMIcznAhH-IRqOr',
        title: 'Paroles BV2 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV2'],
      },
      {
        id: '17BdNjjaKpzArdX02QjulVid93fapLHOk',
        title: 'Paroles BV2 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV2'],
      },
    ],
  }, // 23 - Where is My mind ? - The Pixies
  {
    id: 41,
    title: "J't'emmène au vent",
    artist: 'Louise Attaque',
    tutorials: [
      {
        id: '1cb7jjNtDPWSurNcFFJzyI_TfIiA39ane',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1WmvVywSr8QKNgCGE2QkudjNA6Se5P-b4',
        title: 'Paroles (provisoire)',
        type: 'lyrics',
      },
    ],
  }, // 41 - J't'emmène au vent - Louise Attaque
  {
    id: 1,
    title: 'Allumer le Feu',
    artist: 'Johnny Hallyday',
    tutorials: [
      {
        id: '1_t9Pp2opCymMxNY7fUQEOzD1QtWWnqsv',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1j3ZDQ87AJfQYO_ylisgmDJuaSptrn0tu',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1iuq4MymPjOLLUzUEcbLsPyN6xZpZbMBF',
        title: 'Tuto BV1 M',
        type: 'video',
        gender: 'M',
        category: ['BV1'],
      },
      {
        id: '1klilCgZl2IEGH009qD9vCDVOTtB-UHp5',
        title: 'Tuto BV2 M',
        type: 'video',
        gender: 'M',
        category: ['BV2'],
      },
      {
        id: '1WDlYU3Mh0lbLHt9huSQSbLEogfkGBMjo',
        title: 'Tuto BV1 F',
        type: 'video',
        gender: 'F',
        category: ['BV1'],
      },
      {
        id: '1kHImaSqObMbwWwlqsJfth9pb1pY3td64',
        title: 'Tuto BV2 F',
        type: 'video',
        gender: 'F',
        category: ['BV2'],
      },
      {
        id: '1L840s0QFXTLHvSN2VmyodO9RExEc0fJ8',
        title: 'Lyrics LEAD M&F',
        type: 'lyrics',
        category: ['LEAD'],
      },
      {
        id: '1BacDb3QitEEY8TtncNPjaTw7dEc-gB56',
        title: 'Lyrics BV1 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV1'],
      },
      {
        id: '19-VHj0tMchfHfRrBVq9BdZ4N9ypGsbWj',
        title: 'Lyrics BV1 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV1'],
      },
      {
        id: '1BrYRKw0nbXMX_arh8EDu2oBvH3tE_OcL',
        title: 'Lyrics BV2 M',
        type: 'lyrics',
        gender: 'M',
        category: ['BV2'],
      },
      {
        id: '17n7k_Z5Mh3EXSOhFFewm3PigB4CUErn7',
        title: 'Lyrics BV2 F',
        type: 'lyrics',
        gender: 'F',
        category: ['BV2'],
      },
    ],
  }, // 1 - Allumer le feu - Johnny Hallyday
  {
    id: 12,
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    tutorials: [
      {
        id: '1pY13LFScyDSnx2Su57cXhBdCC9NB8bbW',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1-Y5pz8cO-si0fV_D4FC7K6bOlYb1sLEw',
        title: 'Click Track - VOX',
        type: 'audio',
      },
      {
        id: '1Ko8Dk9u_eoWlgS1Z3N8QeZghKZOyqy1m',
        title: 'Paroles',
        type: 'lyrics',
      },
    ],
  }, // 12 - Seven Nation Army - The White Stripes
  {
    id: 33,
    title: 'Smells Like Teen Spirit',
    artist: 'Shaka Ponk',
    tutorials: [
      {
        id: '11aWkSCFWcnvl-l89HdrwOPLdPQvl4gEF',
        title: 'Chanson originale',
        type: 'audio',
      },
      {
        id: '1OUllSE00muwdDcNT-vvpSyXTwFBocVCT',
        title: 'Paroles (provisoire)',
        type: 'lyrics',
      },
    ],
  }, // 33 - Smells Like Teen Spirit - Shaka Ponk
];

export default songs;
