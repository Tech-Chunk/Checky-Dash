import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'checky-eff42',
      clientEmail: 'firebase-adminsdk-w4zes@checky-eff42.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAUrDNCkVBb+Kt\n/+yBwNidUR0B3m1HfxFeCQ/Ph2UGJ85M2l8DzNLYmJZx/go68N3STSCFV3vOeQ+F\nvA6LYVu+cYnQTqfDkBFzOWcljqC/DTMiBTGNWfP4MSIhc4182OQmz4V90p19lxwG\nDGYpQGV0JF23ekvRPrYgEB2yt810g6o4IcjWR7i9z+upWfZw7L+q7L7I8OecQ+go\n/SDMbh67alg8wfXEnbj4Ox16W1BNLu3iwK4qefAFzcSA2QTgE2/FqRb4GR631nNi\nvYfwe0vtc8rzceNOYMdyjy6V+2vIrrm9f3xw2WFXCjpqHFyzhcLOfOxT2aSAKnbY\n7S6VUTOHAgMBAAECggEADHXPCpm9vu2WzBsmoYly/05ACNz2S4mKAIOpyJJHE00E\n6qnDOiXNC0dnh98jnon4dSWWE82FMe1Z+hoi/xjBrucAPMS7zcnJt6NicWZ6N6aN\nR4j6muPXEJ9uTKiF5C7RKUqMpYg9t+NQZ3vqKoYHjKzGfZqoyte7SPyCUA/kecXp\nOH4uVZ0qpNFEbS5MMYRyys4Acjjj59lmUJqDikrqWgjVXd7LSX/MRyCONQBIwm+p\nzaFRVjsV07veitB72i78FiEht9s5PhoQhqHqDpqe4tWZvce6qA/YmIqhAZjwKv80\nr6boTqjnfNauZ8JPt7q6/UOKNF+ogY8bFEF0kJJd0QKBgQDp/A6pw+VN0Fm5oEJt\nGFkWBLxSRECk2QhKS1SNKPXbN/DrPJY4ctElsxwDgtkw63h2sjQLZj6QdKduMaGy\nnFaIU2/47c7oE9+jN/8LFn9VP6OQ9lYaI55aBRrBwleYLfasr/VIxyIYb7HAM6xo\nZ7HCCwYP1M2DFEbpe1eMHeLAfQKBgQDSayN4jryZWnmeDUTLE1KmMoBLtLiSyS7y\nCIlWNm8uWqU74WmHhXbaerstaFhqOJFujNljunBtQ6HrT2U5Q3I/Cyu94AdX9l1k\ncYAaqjEsAo39u+eL7ERBwLRcp6FO9z6kVY2Uo349V9ci4hsYOlEBXeaN4XPHoizU\nL9nV9EznUwKBgDCb87PjBY0v3qQIniQp7b/8Rd9VXJSine1JTwxwWPss2PkVwiOB\n/t81IXm9Qj++e201Qkin+hFqmqny16PShMuXgeiWBukBz/EJnguApf1g1is0cdjG\nU4xiCRf9ttLfoaJof62Z6QRol+XVFlkuSaiFP8IkNHmpyb2RqTNrtgLFAoGBAJYJ\nAu/RhzUpyBIkj+rlSkdrNwPERt+TSEAYSiUJB1ncFHmQDvks90Rtws1r269RypEz\nKUbtB4FBelEY+apNJ0dApd3rwhC8gHdAXwGkXQ9ueuRzeXTR8RGZYIG4nVJ7BVWU\nEzHrKfZ/jc03v+4UlvIMjHqaST4Nqz1ZKVBfs/41AoGAC9nTgbL0dfwmrSt+3jSF\nEAoBuXL3Z9c21tSQ0t1hvwsr63u340/9XlTbEl7XvET6onp84tUUE6ka5HXX09vV\ncgpv/k4uqrUd0hdgsM0FoOwYPaKXoIy78I/pD/M+KkyDfeC84dG6BFOagfbPY/+J\norpXW99HfxB8k0CLW3jGWBs=\n-----END PRIVATE KEY-----\n', // Replace escaped \n with actual newlines
    }),
  });
}

export default admin;
