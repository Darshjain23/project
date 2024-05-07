const userAndSessionMap = new Map ()

async function setUserAndSessionId(id,userDetail) {
    userAndSessionMap.set(id,userDetail)
}

async function getUserAndSessionId(id) {
    var userDetail = userAndSessionMap.get(id)
    return(userDetail)
}

async function deleteUserSession(id) {
    userAndSessionMap.delete(id)
    console.log(userAndSessionMap)
}

async function cookieExist(id) {
    userAndSessionMap.has(id)
    console.log(userAndSessionMap.has(id))
    return(userAndSessionMap.has(id))
}

export{setUserAndSessionId,getUserAndSessionId,deleteUserSession,cookieExist}