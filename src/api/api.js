import axios from 'axios';


// Profile

export const profileAPI = {
  getProfile() {
    return axios.get(`profile`)
      .then(({ data }) => data)
      .catch(() => alert("Failed to update profile data"))
  },
  setProfilePhoto(url) {
    return axios.patch(`profile`, {
      photo: url
    })
      .catch(() => alert("Failed to update profile photo"))
  },
  setProfile(name, email, aboutMe, status, info) {
    return axios.patch(`profile`, {
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
    return axios.get(`users?_limit=${pageSize}&_page=${currentPage}`)
      .then(({ data }) => data)
      .catch(() => alert("Failed to update users data"))
  },

  userFollow(id, val) {
    return axios.patch(`users/${id}`, {
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
    return axios.get(`posts`)
      .then(({ data }) => data)
      .catch(() => {
        alert("Failed to get posts.")
      })
  },
  getPostsCommentsData(id) {
    return axios.get(`posts/${id}?_embed=comments`)
      .then(({ data }) => data)
      .catch(() => {
        alert("Failed to get posts.")
      })
  },
  setNewPost(post) {
    return axios.post(`posts`, post)
      .catch(() => {
        alert("Failed to load post.")
      })
  },
  deletePost(id) {
    return axios.delete(`posts/${id}`)
      .catch(() => {
        alert("Failed to delete post")
      })
  },

}

//Comments
export const commentsAPI = {
  setNewComment(comment) {
    return axios.post(`comments`, comment)
      .catch(() => {
        alert("Failed to load comment.")
      })
  },
}

//  Dialogs

export const dialogsAPI = {

  getDialogs() {
    return axios.get(`users?_embed=dialogs`)
      .then(({ data }) => data)
      .catch(() => console.log("Error loading dialogs"))
  },

  getDialog(id) {
    return axios.get(`users/${id}?_embed=dialogs`)
      .then(({ data }) => data)
      .catch(() => console.log("Error loading dialog"))
  },

  deleteDialog(id) {
    return axios.delete(`dialogs/${id}`)
      .catch(() => {
        alert("Failed to delete dialog")
      })
  },

  setMessage(post) {
    return axios.post(`dialogs`, post)
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
    return axios.get("news")
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
    return axios.get(`auth`)
      .then(({ data }) => {
        return data
      })
      .catch(() => {
        alert("Failed to update login data.")
      })
  },

  isAuth(value) {
    return axios.patch(`auth`, { isAuth: value })
      .catch(() => {
        alert("Failed to update auth data.")
      })
  }
}
