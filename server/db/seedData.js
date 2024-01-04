// seed data for users

const users = [
	{ users_id: 1, username: "gisula", password: "gisula" },
	{ users_id: 2, username: "emily", password: "emily" },
	{ users_id: 3, username: "crab", password: "crab" },
];

// seed data for "to listen" list

const to_listen = [
	{
		to_listen_id: 1,
		users_id: 1,
		artist: "Victoria Monet",
		album_name: "JAGUAR II",
		image_url:
			"https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/80/48/8a80487e-4bfc-f07c-c47e-79d21905f7e8/196589891235.jpg/1200x1200bf-60.jpg",
		release_date: 2023,
	},
	{
		to_listen_id: 2,
		users_id: 2,
		artist: "Beyonce",
		album_name: "RENAISSANCE",
		image_url:
			"https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Beyonc%C3%A9_-_Renaissance.png/220px-Beyonc%C3%A9_-_Renaissance.png",
		release_date: 2022,
	},
	{
		to_listen_id: 3,
		users_id: 3,
		artist: "Borislav Slavov",
		album_name: "Baldur's Gate 3 (Original Game Soundtrack)",
		image_url:
			"https://i.scdn.co/image/ab67616d0000b2732ac9e040600333ecee1507fe",
		release_date: 2023,
	},
	{
		to_listen_id: 4,
		users_id: 2,
		artist: "Gisula",
		album_name: "The Spirit and the Mouse (Original Soundtrack)",
		image_url:
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.fvHCaB9ouSfieKDADXrvIQHaHa%26pid%3DApi&f=1&ipt=359c6606a6f80ea1b67dd18076a1c472d9264d3348d0ba21f2d648c3ce508bd1&ipo=images",
		release_date: 2022,
	},
];

// seed data for listened list

const listened = [
	{
		listened_id: 1,
		users_id: 1,
		artist: "Noname",
		album_name: "Rainforest",
		image_url: "https://f4.bcbits.com/img/a0070908301_10.jpg",
		release_date: 2021,
		review: "banger. love the flow and great to see the kount produce this one.",
		rating: 4.5,
		date_listened: 2023,
	},
	{
		listened_id: 2,
		users_id: 2,
		artist: "Beyonce",
		album_name: "Lemonade",
		image_url:
			"https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png/220px-Beyonce_-_Lemonade_%28Official_Album_Cover%29.png",
		release_date: 2016,
		review: "an album for the ages. culturally relevant, and a landmark album in her career. truly stands the test of time.",
		rating: 5,
		date_listened: 2016,
	},
	{
		listened_id: 3,
		users_id: 3,
		artist: "Jackson Wang",
		album_name: "Magic Man",
		image_url:
			"https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/MagicMancover.jpg/220px-MagicMancover.jpg",
		release_date: 2022,
		review: "very fun new sound for Jackson, was better in the studio than live but still a fun listen",
		rating: 3.5,
		date_listened: 2022,
	},
	{
		listened_id: 4,
		users_id: 2,
		artist: "Gisula",
		album_name: "Across Parallel Universes",
		image_url: "https://f4.bcbits.com/img/a2351719228_16.jpg",
		release_date: 2023,
		review: "disjointed and could be better but maybe fun nonetheless",
		rating: 3,
		date_listened: 2023,
	},
];

module.exports = {
	users,
	to_listen,
	listened,
};
