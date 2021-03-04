import axios from 'axios';


const instance = axios.create({
  baseURL: " http://localhost:3001/",
});


// Profile

export const profileAPI = {
  getProfile() {
    return instance.get(`profile`)
      .then(({ data }) => data)
      .catch(() => alert("Failed to update profile data"))
  },
  setProfilePhoto(url) {
    return instance.patch(`profile`, {
      photo: url
    })
      .catch(() => alert("Failed to update profile photo"))
  },
  setProfile(name, email, aboutMe, status, info) {
    return instance.patch(`profile`, {
      name: name,
      email: email,
      aboutMe: aboutMe,
      status: status,
      info: info
    })
      .catch(() => console.log("Failed to update profile data"))
  }
}

// Users
export const usersAPI = {

  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?_limit=${pageSize}&_page=${currentPage}`)
      .then(({ data }) => data)
      .catch(() => alert("Failed to update users data"))
  },

  userFollow(id, val) {
    return instance.patch(`users/${id}`, {
      followed: val
    })
      .catch(() => {
        alert("Failed to follow user")
      })
  }

}

// Posts

export const postsAPI = {

  getPosts() {
    return instance.get(`posts`)
      .then(({ data }) => data)
      .catch(() => {
        alert("Failed to get posts.")
      })
  },
  getPostsCommentsData(id) {
    return instance.get(`posts/${id}?_embed=comments`)
      .then(({ data }) => data)
      .catch(() => {
        alert("Failed to get posts.")
      })
  },
  setNewPost(post) {
    return instance.post(`posts`, post)
      .catch(() => {
        alert("Failed to load post.")
      })
  },
  deletePost(id) {
    return instance.delete(`posts/${id}`)
      .catch(() => {
        alert("Failed to delete post")
      })
  },

}

//Comments
export const commentsAPI = {
  setNewComment(comment) {
    return instance.post(`comments`, comment)
      .catch(() => {
        alert("Failed to load comment.")
      })
  },
}

//  Dialogs

export const dialogsAPI = {

  getDialogs() {
    return instance.get(`users?_embed=dialogs`)
      .then(({ data }) => data)
      .catch(() => console.log("Error loading dialogs"))
  },

  getDialog(id) {
    return instance.get(`users/${id}?_embed=dialogs`)
      .then(({ data }) => data)
      .catch(() => console.log("Error loading dialog"))
  },

  deleteDialog(id) {
    return instance.delete(`dialogs/${id}`)
      .catch(() => {
        alert("Failed to delete dialog")
      })
  },

  setMessage(post) {
    return instance.post(`dialogs`, post)
      .catch(() => console.log("Failed to post object!"))
  }
}

// News

export const newsAPI = {
  // getNews() {
  //   return axios.get("http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9005218ac29e49b1b37068327da2747d")
  //     .then(({ data }) => {
  //       return data;
  //     })
  //     .catch(() => {
  //       alert("Failed to update News")
  //     })
  // }
  getNews() {
    return instance.get("news")
      .then(({ data }) => {
        return data;
      })
      .catch(() => {
        alert("Failed to update News")
      })
  }
}

// Auth

export const authAPI = {

  login() {
    return instance.get(`auth`)
      .then(({ data }) => {
        return data
      })
      .catch(() => {
        alert("Failed to update login data.")
      })
  },

  isAuth(value) {
    return instance.patch(`auth`, { isAuth: value })
      .catch(() => {
        alert("Failed to update auth data.")
      })
  }
}
