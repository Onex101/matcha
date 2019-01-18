const uuidv4 = require ('uuid/v4')

const createUser = ({id="", name="", socketId = null} = {})=>(
	{
		id,
		name,
		socketId
	}
)

const createMessage = ({message="", sender=""} = {})=>(
	{
		id:uuidv4(),
		time: getTime(new Date(Date.now())),
		message,
		sender
	}
)

const createChat = ({id, messages = [], name = "Community", users = [], isCommunity = false} = {})=>(
	{
		id,
		name: isCommunity ? "Community" : createChatNameFromUsers(users),
		messages,
		users,
		typingUsers:[],
		isCommunity
	}
)

const createChatNameFromUsers = (users, excludedUser = "")=>{
	return users.filter(u => u !== excludedUser).join(' & ') || "Empty Users"
}

const getTime = (date)=>{
	return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
	createChat,
	createMessage,
	createChatNameFromUsers,
	createUser
}

