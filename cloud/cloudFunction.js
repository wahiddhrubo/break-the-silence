Moralis.Cloud.define("getRoom", async (req) => {
	const id = req.params.id;
	const rooms = Moralis.Object.extend("Rooms");
	const query = new Moralis.Query(rooms);
	query.equalTo("objectId", id);
	const data = await query.find();
	return data;
});

Moralis.Cloud.define("setToken", async (req) => {
	const id = req.params.id;
	const token = req.params.token;
	const rooms = Moralis.Object.extend("albums");
	const query = new Moralis.Query(rooms);
	query.equalTo("objectId", id);
	const data = await query.find();

	if (data) {
		data.set("tokenId", token);
		data.save();
	}
	return data;
});

Moralis.Cloud.define("getRooms", async (req) => {
	const id = req.params.id;
	const user = Moralis.Object.extend("_User");
	const query = new Moralis.Query(user);
	query.equalTo("objectId", id);

	const data = await query.first({ useMasterKey: true });

	return data.attributes;
});

Moralis.Cloud.define("getUser", async (req) => {
	const username = req.params.username;
	const query = new Moralis.Query("_User");
	query.equalTo("username", username);

	const data = await query.find({ useMasterKey: true });

	return data;
});

Moralis.Cloud.define("getUserByAcc", async (req) => {
	const ethAddress = req.params.address;
	const query = new Moralis.Query("_User");
	query.equalTo("ethAddress", ethAddress);

	const data = await query.find({ useMasterKey: true });

	return data;
});
