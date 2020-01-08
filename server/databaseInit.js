const mysql = require('mysql');

//UPDATE mysql.user SET host='%' WHERE user='root';
//FLUSH PRIVILEGES;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin1',
});



connection.connect(function (err) {
	if (err) throw err;

	console.log('Recreating matcha_db database...')
	connection.query('DROP DATABASE IF EXISTS matcha_db');
	connection.query('CREATE DATABASE matcha_db');

	connection.changeUser({database : 'matcha_db'}, function(err) {
		if (err) throw err;
	});

	console.log('Deleting old tables...')
	connection.query('DROP TABLE IF EXISTS users');
	connection.query('DROP TABLE IF EXISTS pictures');
	connection.query('DROP TABLE IF EXISTS history');
	connection.query('DROP TABLE IF EXISTS likes');
	connection.query('DROP TABLE IF EXISTS notifications');
	connection.query('DROP TABLE IF EXISTS history');
	connection.query('DROP TABLE IF EXISTS msgs');
	connection.query('DROP TABLE IF EXISTS conversations');
	connection.query('DROP TABLE IF EXISTS interests');
	connection.query('DROP TABLE IF EXISTS user_interests');
	connection.query('DROP TABLE IF EXISTS blocks');

	console.log('Initiating tables...')
	connection.query("CREATE TABLE `users`\
	(`id` int(9) unsigned NOT NULL AUTO_INCREMENT,\
	`user_name` varchar(100) NOT NULL,\
	`password` varchar(255) NOT NULL,\
	`first_name` varchar(100) NOT NULL,\
	`last_name` varchar(100) NOT NULL,\
	`email` varchar(100) NOT NULL,\
	`birth_date` date NOT NULL,\
	`gender` decimal(3,2) unsigned NOT NULL,\
	`pref` decimal(3,2) unsigned NOT NULL,\
	`gps_lon` decimal(5,3) NOT NULL,\
	`gps_lat` decimal(5,3) NOT NULL,\
	`bio` tinytext NOT NULL,\
	PRIMARY KEY (`id`))\
	ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;");

	connection.query('CREATE TABLE pictures\
	(id int NOT NULL AUTO_INCREMENT,\
	pic longtext,\
	user_id int(9),\
	PRIMARY KEY (`id`))');

	connection.query(`CREATE TABLE history\
	(viewer_id int NOT NULL,
	viewed_id int NOT NULL,
	timestamp DATETIME DEFAULT NOW()
	)`);

	connection.query('CREATE TABLE likes\
	(user1_id int NOT NULL,\
	user2_id int NOT NULL,\
	link_code int)');

	connection.query('CREATE TABLE user_interests\
	(user_id int NOT NULL,\
	interest_id int NOT NULL\
	)');

	connection.query('CREATE TABLE interests\
	(id int NOT NULL AUTO_INCREMENT,\
	interest varchar(255) NOT NULL,\
	PRIMARY KEY (`id`))');


	connection.query('CREATE TABLE notifications(\
	id int NOT NULL AUTO_INCREMENT,\
	user_id int NOT NULL,\
	noti varchar(255),\
	viewed_status int DEFAULT 0,\
	PRIMARY KEY (`id`)\
	)');

	connection.query('CREATE TABLE conversations\
	(id int NOT NULL AUTO_INCREMENT,\
	user1 int NOT NULL,\
	user2 int NOT NULL,\
	PRIMARY KEY (`id`))');

	connection.query('CREATE TABLE msgs\
	(id int NOT NULL AUTO_INCREMENT,\
	conversation_id int NOT NULL,\
	sender int NOT NULL,\
	msg varchar(1000),\
	timestamp DATETIME DEFAULT NOW(),\
	viewed int DEFAULT 0,\
	PRIMARY KEY (`id`))');

	connection.query('CREATE TABLE blocks\
	(id int NOT NULL AUTO_INCREMENT,\
	user1_id int NOT NULL,\
	user2_id int NOT NULL,\
	PRIMARY KEY (`id`))');

	console.log('Creating fake profiles...')

	connection.query("\
	INSERT INTO `users` VALUES\
	('101','lamar91','7e7d7c2297a619a23d825031c91ce38e7a339e6a','Deron','Rolfson','freeda81@example.com','1983-02-12','1.00','0.57','-99.999','17.973','Ut animi eveniet optio fugit eum dolores ut consectetur molestiae quo aspernatur quo magni.'),\
	('102','judd.boyle','f09aa819ce0e17a5b24449dd7af0556371f8f2a0','Otis','Reichert','kutch.jerel@example.net','2008-01-20','0.91','0.58','99.999','-64.400','Ea enim quis consequatur dolorem animi facilis itaque porro cupiditate aut suscipit ut aut.'),\
	('103','mschuppe','f3cb025343868739492b5b2517028f20758a2994','Lesly','Eichmann','dhyatt@example.com','1992-03-29','0.80','0.75','-99.999','-37.593','Repudiandae et accusamus atque a laboriosam deserunt molestias excepturi nihil quasi.'),\
	('104','hackett.aaliyah','93ff39592cc6636e04a8e3023c1a6337b6c5ac14','Kara','Howell','zhessel@example.net','2009-07-01','0.56','0.15','-99.999','-26.120','Dicta dignissimos sed dolor nam nostrum doloremque temporibus.'),\
	('105','nayeli79','fe6e34d314dbe262ab82ba77489da73017e2fca2','Mittie','Roberts','pearl86@example.net','1998-01-23','0.15','0.58','-91.806','-51.758','Dicta voluptas dolor omnis dolores numquam officia aut excepturi earum aut libero maiores modi numquam.'),\
	('106','crist.hank','912b5562957591053e3715db1c2232a4bfb6f9d5','Kassandra','Fahey','magdalena.wiegand@example.com','1999-03-07','0.55','0.75','-99.999','14.232','Nostrum vitae sunt modi velit modi aut repellendus quae quo nemo labore.'),\
	('107','alycia.padberg','3cb94c7fdf90e905f8196f669e488377415eb36a','Luciano','Marquardt','lucienne47@example.net','1998-07-17','0.56','0.98','99.999','60.904','Qui libero repudiandae maxime autem voluptatem commodi optio odit reiciendis non earum eveniet.'),\
	('108','shields.jonatan','11aa92cf61b2ddfd653c4cecca689b6c11d43465','Lyla','Medhurst','leuschke.frankie@example.org','1986-08-21','0.58','0.58','8.137','-82.489','Et ad voluptatem voluptate mollitia ducimus in saepe quaerat temporibus non iusto.'),\
	('109','cdach','ddc623a7d4f7e23c830db5279c80d62eab5af4ad','Lorenza','Pouros','oaltenwerth@example.org','1993-05-20','0.50','0.07','99.999','39.198','Occaecati id minus exercitationem vel fuga est itaque enim.'),\
	('110','nels99','1af38dadf17a66dc0b6c03df57391f49f6e82d49','Laverne','Brekke','npouros@example.net','1981-08-06','0.90','0.61','99.999','16.448','Tempore quia repellendus est et aut dolor.'),\
	('111','rosalia59','81b9f54beb089d33b28cb784baecffe2397477ae','Vida','Abshire','schiller.beulah@example.com','2009-01-10','0.37','0.03','-99.999','-71.805','At ipsam facilis mollitia in quae impedit.'),\
	('112','gerlach.annabell','03592ad4337e3610a77c085f704b924b24c47338','Miller','Smith','loraine47@example.com','2001-03-14','0.84','0.41','-56.836','75.521','Laborum modi hic nesciunt deserunt fugit vel in.'),\
	('113','towne.cristal','b94edfbb205f33afccbfc6e534f036d493542466','Craig','Jones','lstoltenberg@example.com','1976-08-29','0.47','0.62','-99.999','-37.864','Aut velit et reprehenderit enim molestiae sed dignissimos veniam qui incidunt quo quis.'),\
	('114','maverick93','1ccd9577566bac468db66ee66f9c8e4e1fa6c03b','Lacey','Rau','margarett73@example.org','1978-12-08','0.06','0.87','-15.407','41.374','Consectetur ex aut voluptas aut animi impedit qui possimus eos dolorem.'),\
	('115','ara68','1e5395c5981d7643d6915cfe2b9d6fafdde852a1','Dawn','Green','pascale.ullrich@example.net','1978-11-09','0.47','0.67','30.404','-60.499','Illo vel aspernatur inventore libero repellendus quaerat enim aliquam ullam ut vitae inventore animi.'),\
	('116','osinski.doris','ba2c0a9d7ee3c71d60a0e9161f509f8db70007e8','Daryl','Schowalter','pfriesen@example.org','1992-01-14','0.95','0.67','99.999','24.068','Dolor repellat nisi similique qui et sapiente in impedit adipisci voluptatibus.'),\
	('117','feil.giovanny','91453b8f2eb79abae9b9edfeb28f86df096e6090','Sydnie','Moen','kaleb.friesen@example.net','1981-04-27','0.88','0.73','-99.999','-36.761','Eum commodi debitis sunt nam vel iusto dolorem et quia voluptate.'),\
	('118','stephen91','6ae8600d673863b56e112fedc516c239b7596d9e','Waino','Towne','savanah72@example.com','1985-12-25','0.59','0.39','-24.455','-65.982','Repudiandae occaecati vero modi voluptatem et ut dolor blanditiis.'),\
	('119','cummings.janae','3b46d4752bd771b865f5dfd9619bbf7ee509a52a','Carlee','Sawayn','ramiro12@example.org','2008-10-12','0.83','0.65','60.004','16.215','Et dolore voluptatem sequi consequatur eum ipsum non voluptates tempora eligendi.'),\
	('120','dexter.boyer','6434b4d9fa697da51c5dbef2fdf43bad5cda470e','Chloe','Cremin','dorris91@example.org','1997-10-30','0.89','0.26','99.999','-20.022','Reiciendis aut et reiciendis optio nemo voluptatem et voluptatum sunt deleniti magni.'),\
	('121','dixie.mclaughlin','f16dcc9f5054da396ddb320e6c55072f73686f7f','Quentin','OKon','jovani.heller@example.org','1971-04-01','0.85','0.65','76.586','-0.941','Eum repudiandae eaque et quibusdam minima minima aut accusantium explicabo fugit quia consectetur.'),\
	('122','balistreri.wilfrid','5892a53f5e1eb16d543f649de519e02afa71688c','Lennie','Jaskolski','pschumm@example.com','1985-01-27','0.72','0.83','-46.762','-86.887','Beatae atque aliquid esse rerum non sequi odit ipsam quos amet explicabo commodi quas.'),\
	('123','hailee.lebsack','3c6089bc842984fae1a2b90784a33b9cd2bfc29c','Leon','Hackett','johann23@example.net','1997-01-01','0.58','0.05','21.938','-20.465','Quo quisquam laborum est et ut aut iusto eum enim.'),\
	('124','kassulke.ashleigh','7b9752ce6425042e0b88d911f7f6363fde060a17','Icie','Feest','legros.giuseppe@example.net','1976-11-28','0.51','0.09','-99.999','54.639','Enim sunt quia rerum accusamus rem laboriosam ut.'),\
	('125','adonis.kutch','0763e64a7e2d996b5354a503bfd7a6f458a6bd08','Vanessa','Jakubowski','ebert.ernestina@example.org','2001-04-27','0.42','0.81','-78.976','22.245','Consequatur eligendi et qui veritatis omnis eligendi architecto nobis sequi et voluptatum debitis.'),\
	('126','david.schuster','2df7f8bdc2b3eddfb16a8f5e47c8cb20f2b28ca8','Janiya','Bernhard','iva96@example.org','1986-07-20','0.42','0.89','99.999','-57.592','Ut qui est sed ut in aut recusandae veritatis natus illum tempore in dolore voluptate.'),\
	('127','pwisozk','17ac094551634f1cfba2dac21545e739458f409e','Brendan','Jacobi','jody.olson@example.org','2009-05-13','0.89','0.69','99.999','65.956','Quo delectus inventore ducimus minima voluptas vel expedita omnis quidem temporibus fugit temporibus.'),\
	('128','odonnelly','575754be2c432f9791617ee784e81792b8b2743e','Estevan','Hermann','jorge.mertz@example.org','1977-05-12','0.47','0.55','47.464','-37.019','Quis molestiae placeat eum accusamus ex vel quia voluptas et deleniti.'),\
	('129','mckayla03','b40aaf502bbc5c2f3f319c85bd94440854589e26','Jerrold','Sanford','earlene.welch@example.com','1997-02-26','0.66','0.44','-99.999','73.980','Voluptas voluptates illo non magni consequatur fugit impedit eaque ipsam est doloribus voluptates.'),\
	('130','tremblay.christopher','1f8aadb097be170360cd12922347bc10b392c9fa','Cortez','Lowe','ublick@example.net','1987-10-30','0.83','0.08','3.021','-52.024','Nihil autem et corporis porro est fugit id odit autem debitis.'),\
	('131','whoppe','270e2aaa2d3e7c6f7167d96f18da74528e3cc725','Tracy','Howe','oberbrunner.jose@example.com','1981-01-15','0.53','0.37','-99.999','87.565','Est vel incidunt ratione voluptas quae nostrum voluptas ut est libero excepturi.'),\
	('132','virgie27','3e25f2e1514e0e9c2665f4d682c23ae5e35e4afb','Jolie','Krajcik','peyton.kling@example.com','1970-09-16','0.56','0.16','99.999','21.589','Quibusdam accusamus et dolorem ipsam quidem debitis tempora laboriosam labore suscipit dolorem reprehenderit vel.'),\
	('133','monahan.shirley','e297833be094fa0937b2da1ad3659b81aff02a74','Berniece','Thiel','clementina61@example.org','1990-09-11','0.77','0.64','-88.378','-74.412','Quis magnam quod sit quasi libero totam aut.'),\
	('134','hilario.miller','4e87e8b08e08e86cf2a662ef2dfa5c24526d5fdb','Lelah','Zulauf','vtowne@example.net','2001-11-21','0.56','0.58','-14.452','7.808','Adipisci ut est et alias quibusdam sed mollitia aspernatur voluptas et omnis et.'),\
	('135','regan64','b50ed16c881eab5bf92559e3a0b662351c019758','Wendy','Cormier','idach@example.org','1988-04-11','0.33','0.25','-99.999','61.221','Expedita cumque earum laudantium est autem hic consequuntur ducimus provident expedita.'),\
	('136','gzemlak','a5cfbcd390c06d400f57ee29844b2829f2c2b06e','Jada','Graham','eichmann.imogene@example.org','2004-11-07','0.23','0.90','0.403','-84.519','Quia sint quia maiores mollitia animi sunt saepe ea.'),\
	('137','romaine43','2e0c9efb75061c10b2778ee3eb01655e0b765bf7','Lexi','Bernhard','jacobi.maximo@example.org','2016-02-23','0.79','0.27','-0.846','-85.663','Qui aliquam sunt est ut autem tempore autem veritatis officiis ut molestias voluptate.'),\
	('138','bquigley','20220ced31c5f434541fc337ee5dfa73fd838743','Leslie','Schroeder','claudine.schowalter@example.org','1995-12-18','0.69','0.67','24.032','68.207','Impedit atque esse incidunt labore in quis praesentium.'),\
	('139','robel.letha','d99af78f5ba8faff2a7d6934cf714984c9f9e00c','Otha','Romaguera','elmer45@example.org','1978-09-06','0.95','0.96','-99.999','-53.208','Eius repellendus delectus voluptatum iusto reprehenderit aut id accusamus atque.'),\
	('140','lilian.quitzon','fa48614d3e6319b149f050aab8300773612e1bd2','Bulah','Oberbrunner','elian.walsh@example.net','2016-02-16','0.95','0.88','-99.999','-53.955','Dolor quia delectus blanditiis ut accusantium aut aliquam ea delectus dignissimos est temporibus ipsum.'),\
	('141','dietrich.ernestine','5d578b19241324085eb925287a484ed65b5d680b','Fleta','Gorczany','rachelle30@example.com','1999-06-07','0.71','0.73','-99.999','38.254','Magni explicabo quisquam sed nostrum suscipit et sequi laboriosam commodi maiores.'),\
	('142','lukas.simonis','6800f4a67f0d03b356f0db75637d31a1bb465b39','Harvey','Beahan','braden.mertz@example.net','1999-11-19','0.61','0.81','-16.257','69.406','Tenetur commodi natus earum aut et rerum voluptatem eos nihil dicta cum incidunt aut.'),\
	('143','lamont48','896a12942163f066de893f08cb6a3308283e68b6','Asa','Von','selena30@example.com','1974-02-17','0.83','0.26','-99.999','-10.817','Sequi quod quisquam exercitationem voluptas enim debitis enim qui reprehenderit distinctio at.'),\
	('144','daugherty.alicia','61503e7044b09fc6437d0f40a97cc3afc44114b2','Colin','Schoen','otto.keebler@example.net','1994-02-12','0.00','0.81','-16.553','33.872','Hic recusandae doloremque iste molestiae laboriosam soluta.'),\
	('145','catalina21','00d0a03a9dbeb630e70b006d07c3d0cca0e7e0d1','Name','Cremin','waters.alvis@example.org','2013-12-26','0.89','0.58','-75.299','-6.298','Consequatur sunt aut dolores occaecati dolor non blanditiis.'),\
	('146','rtrantow','c562b14d7579c00271ba7a1f5703c6943c1b3973','Marlen','Keeling','thompson.jerald@example.com','1974-11-10','0.14','0.36','-79.200','10.383','Quia aperiam harum quibusdam reprehenderit cupiditate repellendus et aliquam id ea.'),\
	('147','fadams','ba5bd24c64bb373a998fd3d0ae9dc7a760f1e145','Alvera','Johnston','maximillian.welch@example.net','2000-05-12','0.10','0.06','54.004','89.075','Qui maiores dolorum qui esse provident minima.'),\
	('148','tpaucek','1eca15de1a5b2488612e26dbba78b1378a20f381','Amari','Schoen','antonia99@example.com','1985-11-02','0.47','0.88','99.999','47.671','Magni occaecati facere exercitationem possimus asperiores earum et non a corrupti dicta dolores.'),\
	('149','kylie.considine','c62318bd25b7bccf390e3c49e8f85dca15da597f','Jaylon','Gerlach','weissnat.jermain@example.org','1982-05-24','0.18','0.11','99.999','-83.341','Excepturi officia ad aut nostrum itaque qui quibusdam incidunt ex et inventore voluptatum ab.'),\
	('150','sawayn.marco','69bf3f1ba81662f9216a90ddbbd50cb5c8d74f7e','Ephraim','Paucek','zella68@example.net','2014-08-25','0.17','0.77','71.806','-18.722','Id sed et quibusdam odio maxime commodi nulla.'),\
	('151','kane.stroman','d9eca58a1b3f9af6c00b8257a8f1d40d7270368d','Rhianna','Jakubowski','farrell.devon@example.com','1999-07-08','0.86','0.90','-88.980','35.723','Qui modi mollitia sit id dolores enim adipisci voluptatibus.'),\
	('152','goyette.sage','789367f83fe32b6331d79ac81d43b0dca09ecc54','Shanel','Schmitt','alfonso.kessler@example.com','2015-12-01','0.43','0.76','-19.135','7.814','Quos reiciendis cum dignissimos quo vitae culpa voluptatum vitae maiores rem.'),\
	('153','idare','da93377a9d386486e04a2b1e50230b9cd01cee4d','Mary','Murazik','hirthe.dolly@example.net','1991-02-23','0.74','0.71','-99.999','-78.979','Qui sint in nobis quia illum inventore eos sunt voluptatibus nemo.'),\
	('154','gleichner.benedict','5d94502281ada85d799848eb636bbc2603457876','Brady','Braun','orland15@example.org','1981-10-17','0.39','0.51','99.999','74.720','Quia quam atque sit est doloribus eveniet quia sapiente officiis libero voluptas aut neque.'),\
	('155','melody.upton','e174586b81059f93db310853760fe8c43e0954bf','Lori','Huel','clemens.ullrich@example.org','2014-10-02','0.53','0.49','99.999','-65.464','Voluptas vitae rerum officia sint commodi numquam sapiente.'),\
	('156','gottlieb.katelyn','357fcc6d273df1655b080ae8cf371c987a16ff14','Maybell','Johns','nokuneva@example.org','2018-11-27','0.49','0.61','-99.999','-59.486','Hic eum consequatur dolorum aspernatur error totam saepe tempora ipsum aut rerum.'),\
	('157','guillermo.bayer','9eac1ee54d0696f6fd93c78bcbe7b538e6bb0bb6','Payton','Witting','izaiah23@example.com','2009-01-31','0.39','0.55','-41.310','32.374','Facilis ratione fugiat distinctio eos tempore tempore.'),\
	('158','danial.gerhold','026f8a2c50c110e9cb49c1153efad93f5f45e7e7','Caterina','Mitchell','franecki.kamille@example.com','1980-01-11','0.18','0.85','-99.999','-63.671','Debitis temporibus est et qui dignissimos odit ab nihil voluptate dignissimos sunt doloremque qui.'),\
	('159','gaetano07','4bcd6791dc83a95b2bed49fbd5924492d58cf9b8','Stone','Langosh','virginie.mueller@example.com','2013-01-11','0.10','0.86','-93.541','36.151','Autem impedit perferendis quas ipsum itaque mollitia magni ut nihil consequatur ipsa.'),\
	('160','feffertz','b8f828e2a1fd93d9d3e662e5f988506a3f7be101','Merritt','Cruickshank','jweimann@example.com','1985-06-30','0.33','0.03','3.037','78.977','Molestiae sed est et qui maiores earum harum et et aut ratione veniam.'),\
	('161','verlie.sauer','c1d24c65969a3b3420b1666b575717b3be8db20e','Sabina','Huel','stuart64@example.net','1975-09-20','0.84','0.71','-99.999','28.201','Enim qui in suscipit vero laudantium atque ut nihil consequuntur sint officiis.'),\
	('162','muhammad.cronin','be98fe7b7c6de0025ccfba70953c0f8f8183d1ee','Ciara','Hintz','mccullough.domenica@example.net','2007-06-20','0.04','0.94','-99.999','65.183','Magnam sint rerum molestiae iure et repellat vitae dolor nemo.'),\
	('163','sanderson','8d32b0ca4b38df16a8625210fbf4562b9fcc9bab','Johan','Smitham','brigitte77@example.net','2018-07-16','0.22','0.52','-33.083','-76.453','Praesentium eveniet cumque soluta ipsam magni debitis.'),\
	('164','cgulgowski','dee4e6440a0d398ad3a5f902839e716b77ca7b1e','Ozella','Hartmann','nhintz@example.org','2004-07-31','0.33','0.38','66.668','1.559','Incidunt omnis dolorum ea debitis blanditiis aspernatur vel.'),\
	('165','uhowell','4a7953d98850e914de6cb224aa7f59eb3cd27674','Paolo','Yundt','laurianne66@example.org','1996-08-14','0.54','0.82','6.227','37.378','Quod porro inventore quos facere et sit eos tempore occaecati aspernatur non qui.'),\
	('166','dusty.mills','e16c9dd7624b6176c383487b2083083583ffe9ce','Crystal','Hackett','lisandro62@example.org','1980-09-29','0.52','0.32','-99.999','25.391','Fugiat vel amet rem modi porro quae voluptate.'),\
	('167','amy30','51333c62616d2747124eb5f518e29efe9fc75d3a','Lenna','Pacocha','gulgowski.meaghan@example.com','1993-10-12','0.38','0.27','99.972','-48.627','Aliquam ea dolorem aut inventore molestias excepturi illum sed rem eaque assumenda accusantium.'),\
	('168','tboyle','25fe751ee260bf4a784f9aad6b3d92a6875fd3f7','Wyman','Bosco','hflatley@example.net','2005-01-19','0.62','0.41','-72.679','75.075','A ut harum unde enim aut dolor accusantium perspiciatis dolor id.'),\
	('169','ephraim.schultz','e6ba9967d9c18146936885d944707e4b84730592','April','Funk','schneider.cassie@example.com','2009-11-14','0.09','0.54','-99.999','-62.756','Corrupti dolores ut odit nam et quam ut animi qui dolore et ea accusantium.'),\
	('170','marcelino.thiel','53c1047f9f2364118c32f2762bb429aea2c8d9b4','Otto','Swaniawski','bernardo32@example.net','1991-07-20','0.37','0.70','88.556','-54.568','Aut distinctio facere ut vero ipsa corrupti error consectetur repudiandae voluptatem eos.'),\
	('171','fdonnelly','34fbbb15eeb976362b31b5088596b25b2db6e6e9','Marie','Bechtelar','daryl.simonis@example.com','1971-09-30','0.45','0.44','-46.529','-10.535','Quia eveniet porro at consequuntur molestiae voluptatem ea minus quis.'),\
	('172','jziemann','8b230c54a128957e81e7bd2c314d60fc24534d74','Raleigh','Schamberger','schoen.johanna@example.net','1985-06-10','0.91','0.80','-78.723','69.139','Quod porro fuga quasi atque rerum repudiandae vel.'),\
	('173','hziemann','814973ac87472c15288db947deb559396bd2c110','Devante','Nitzsche','hudson.rose@example.net','1995-02-24','0.22','0.04','-33.809','-7.569','Animi omnis corporis qui nulla enim sint.'),\
	('174','nkris','24d13f4ec585e36e8cce60570a8b2dc99212ddec','Chadrick','Skiles','cristina73@example.org','1998-10-11','0.09','0.77','65.961','-18.036','Sapiente quae sequi laborum laudantium vero molestiae et quo tempore.'),\
	('175','kshanahan','2116dfc95fd67463438b6d947ed582934d47c5ef','Vincenzo','Donnelly','ellis65@example.com','1980-01-13','0.70','0.43','79.745','-33.345','Dolor qui fugiat optio minima quis recusandae.'),\
	('176','iabbott','8988cb7a3b1575831d8aa457eb8c34db519bab7c','Alison','Labadie','cary.lang@example.org','1985-02-28','0.05','0.74','45.179','49.348','Porro aut accusantium quia qui et officia aut voluptates aut accusamus omnis.'),\
	('177','astrid.mertz','c56c00259119950f30df2e887fcd3eec7b4a2e90','Rosalee','Hilll','evangeline.haag@example.org','1992-09-17','0.51','0.96','-99.999','-50.551','Velit incidunt consectetur distinctio et repellendus laborum fugit consectetur minima consequuntur quo.'),\
	('178','gerson.ledner','87138177bee624811dae5b070c253ae1c44a38c9','Dallin','Williamson','jjaskolski@example.net','2016-10-16','0.47','0.86','-75.873','-15.819','Consequuntur similique non dolorem ad corporis quia sed quia et corrupti rerum.'),\
	('179','olson.allie','a05ca2f263ff9cf6e0355d7bc82b4e00f930f9a2','Xzavier','Raynor','lubowitz.else@example.net','1997-10-09','0.83','0.79','-35.045','-67.596','Et qui aut aliquid pariatur est ducimus qui.'),\
	('180','creola66','c6403047f2f0de728d0ed5553fbb0a0088effe9c','Makayla','Kovacek','asha00@example.com','1986-10-07','0.34','0.04','99.999','-72.754','Eius saepe harum iure praesentium vel reprehenderit illo rerum nesciunt cum temporibus.'),\
	('181','hwindler','bda38c197b268b4027582b80dd521f5534b6e67c','Henderson','Connelly','epouros@example.com','2007-04-05','0.83','0.95','99.999','78.914','Libero sit in et delectus dolor qui eos pariatur ut.'),\
	('182','willms.corbin','a77c7486897a694472c2ffc66eff64f05ba24631','Lue','Goodwin','batz.jordi@example.org','1985-04-07','0.71','0.32','-87.938','-39.033','Nobis animi a ut ut sit rerum consectetur deleniti sapiente pariatur quis.'),\
	('183','oreilly.duane','a3b79b20991f2ea638ee296783dab2279d88676a','Greg','Boyle','renner.emmet@example.org','2015-01-29','0.53','0.70','57.266','39.323','Dolor eius perspiciatis sunt consequatur ex voluptatem cupiditate natus dolorem autem.'),\
	('184','jessika28','2ffcb5f627bbf83f700a034eb34db2f1d330fdfc','Blanche','Jerde','abbott.meaghan@example.net','2002-04-16','0.90','0.94','99.999','62.915','Fugit blanditiis aut aperiam voluptatem repellat velit minima facilis unde non.'),\
	('185','daphnee.gaylord','b2c907afe653dce2fbf3449829d12c4fc31e0216','Major','Schamberger','bbeier@example.org','2018-05-28','0.21','0.16','-99.999','-52.337','Ipsam repellendus occaecati molestias et soluta laudantium est repellat labore qui.'),\
	('186','esteban.sauer','1d05b8a3070a13a2f140ed4d00e0ab78b7429030','Rozella','Bartoletti','leffler.jadon@example.com','2004-11-16','0.31','0.87','99.999','63.168','Voluptatem saepe quos et sint qui inventore perspiciatis mollitia distinctio nostrum.'),\
	('187','oconnell.janet','4282cd46dd2c0ae0d09dbe310643c151ef69a605','Cruz','Windler','nroberts@example.org','1972-08-25','0.50','0.61','-61.298','-31.591','Omnis quia dolorum soluta recusandae minus quod dolore officiis.'),\
	('188','zjohns','baf622416236ef81b4f6d3843b2acc9a4a2c25f3','Scotty','Greenfelder','macejkovic.geraldine@example.net','2018-04-21','0.04','0.31','99.999','-79.694','Sapiente neque cumque quia odit modi nostrum earum repudiandae placeat dolorem est architecto dolor.'),\
	('189','igraham','4db6f4e709a4c938adcbbefdba0955a81646beaf','Ethyl','Johnston','hilpert.shanna@example.net','1972-08-27','0.40','0.60','81.898','-29.459','Exercitationem id labore saepe facilis qui et quis et ea non molestias doloremque.'),\
	('190','ocole','304e2f6869e1df85e64ddc9414405dee50950ab0','Aurelia','Veum','littel.camron@example.net','1992-05-26','0.67','0.86','99.999','-1.355','Suscipit ut qui dolorum fuga atque et dolores ut molestiae repudiandae sit asperiores.'),\
	('191','dovie92','83f4a053a98c3df23596fcd41e1546e59a61fd25','Mafalda','Treutel','blick.nathanial@example.org','2012-08-27','0.51','0.71','-48.647','-9.334','Voluptas voluptatem sunt cumque et quia officiis libero voluptate doloremque culpa quia dolorem.'),\
	('192','okunde','befc95bcf8c80ff96e2686bcf9e170ebf20f55c6','Virginia','Tromp','gschaefer@example.org','2009-12-13','0.17','0.62','-35.527','-17.290','Reprehenderit aut aut sed suscipit veniam unde totam beatae.'),\
	('193','grayson.will','3a9647d0d4edfaf0a37651f933cfdff858a88782','Devonte','Stracke','donato42@example.org','1975-05-15','0.75','0.95','-99.999','-54.865','Est fuga eos recusandae dolorem sit sunt aspernatur excepturi ut nulla.'),\
	('194','carole.schulist','1aa2977e73924d7b3b5bfa0965b1452330503b96','Barton','Erdman','turcotte.molly@example.net','1985-09-13','0.23','0.85','37.069','48.043','Commodi earum non quibusdam est sed ut repellat exercitationem est ipsum corporis.'),\
	('195','violette79','046e4aaa9368fdfeb0e505c7a6cfbc692f096136','Katlynn','Weissnat','magali28@example.com','1978-09-22','0.08','0.05','99.999','34.305','Nostrum voluptates voluptas tempora accusamus et qui minus iure exercitationem quos eligendi est.'),\
	('196','oschroeder','cb550f166bf79a19bee3b8ef6a816f5a5a8fb315','Orie','Emard','lavinia.farrell@example.com','2011-06-01','0.60','0.29','-46.588','-80.215','Consequuntur aut incidunt cupiditate id fugit quo culpa numquam.'),\
	('197','beier.malinda','a1969d101317c2f93348ecc85e34fd4f3b2ef34a','Ephraim','Bechtelar','ewell60@example.net','1973-06-16','0.64','0.15','99.999','-1.049','Illo exercitationem quibusdam occaecati blanditiis minus porro voluptas consequatur ut rerum sequi.'),\
	('198','lyda22','68d262284b0116bdcc760bfedf1110f47e3d1e8f','Lamar','Feeney','anderson78@example.net','1973-11-21','0.34','0.40','-18.002','8.563','Nam eos sit sint nihil voluptas necessitatibus velit nihil.'),\
	('199','kschuster','5a63bf96660f92e9d791ade7521b983e29a095e4','Rafaela','Kerluke','ybailey@example.org','2004-03-04','0.25','0.17','-43.752','81.718','Est rerum iure quaerat ab sed et non.'),\
	('200','dicki.tina','2d5e565def605690f57037fd9a04bd919021185f','Marcos','Schroeder','rory65@example.com','2000-06-24','0.19','0.80','-71.225','-3.490','Sit cumque sit quasi nostrum pariatur illum eaque et.')\
	");

	//adds extra needed columns to user table
	connection.query('ALTER TABLE `users`\
	ADD COLUMN `fame` INT(9) unsigned NULL AFTER `pref`,\
	ADD COLUMN `online` DATETIME AFTER `bio`,\
	ADD COLUMN `veri_code` VARCHAR(100) AFTER `bio`,\
	ADD COLUMN `verified` INT(2) NULL AFTER `veri_code`,\
	ADD COLUMN `profile_pic_id` INT AFTER `birth_date`\
	');

	//creates prepopulated interests table
	connection.query("\
	INSERT INTO `interests` VALUES ('1','potatoes'), ('2','horses'), ('3','picnics'), ('5','bicycles'), ('6','toenails'), ('7','computers'), ('8','gaming'), ('9','airsoft'), ('10','gambling'), ('11','fishing'), ('12','reading'), ('13','aquascaping'), ('14','footskating'), ('15','mansplaining'), ('16','darts'), ('17','fun'), ('18','whiskey'), ('19','hiking'), ('20','dillydallying'), ('21','carpentry'), ('22','furniture'), ('23','jazz'), ('24','wine'), ('4','surfing')\
	");

	//assigns random interests to random users
	connection.query("\
	INSERT INTO `user_interests` VALUES\
	('124','11'), ('116','11'), ('101','1'), ('101','3'), ('102','3'), ('103','3'), ('104','3'), ('104','4'), ('102','4'), ('132','14'), ('174','18'), ('180','6'), ('128','1'), ('107','1'), ('181','14'), ('119','10'), ('135','1'), ('171','22'), ('173','15'),('174','2'), ('186','1'), ('158','16'), ('127','12'), ('108','13'), ('127','4'), ('105','10'), ('136','5'), ('159','7'), ('193','18'), ('163','19'), ('110','1'), ('133','24'), ('125','11'), ('167','7'), ('191','17'), ('120','16'), ('162','15'), ('184','13'), ('171','7'), ('131','8'), ('127','9'), ('196','21'), ('163','15'), ('192','14'), ('140','6'), ('128','12'), ('106','18'), ('150','8'), ('191','7'), ('112','16'), ('189','12'), ('172','1'), ('129','20'), ('173','22'), ('159','14'), ('133','2'), ('163','19'), ('175','5'), ('120','23'), ('129','13'), ('200','13'), ('108','12'), ('136','9'), ('109','21'), ('198','4'), ('135','13'), ('189','24'), ('162','6'), ('159','18'), ('123','8'), ('171','19'), ('152','8'), ('149','21'), ('197','19'), ('121','23'), ('190','3'), ('110','5'), ('200','7'), ('175','22'), ('109','19'), ('158','24'), ('157','16'), ('177','21'), ('182','9'), ('140','6'), ('123','16'), ('129','21'), ('194','3'), ('177','23'), ('113','9'), ('115','23'), ('106','13'), ('112','15'), ('117','10'), ('154','24'), ('125','7'), ('140','15'), ('109','11'), ('114','7'), ('168','17'), ('158','8'), ('159','13'), ('162','23'), ('178','20'), ('179','16'), ('178','11'), ('199','15'), ('157','4'), ('163','17'), ('126','24'), ('104','4'), ('176','20'), ('140','11'), ('106','11'), ('184','1'), ('167','7'), ('106','14'), ('148','14'), ('141','17'), ('128','11'), ('176','8'), ('152','2'), ('168','9'), ('171','21'), ('156','22'), ('148','22'), ('144','15'), ('152','9'), ('157','10'), ('114','13'), ('119','21'), ('135','13'), ('111','4'), ('163','19'), ('192','24'), ('141','20'), ('181','21'), ('195','23'), ('131','24'), ('191','9'), ('166','10'), ('163','18'), ('179','14'), ('192','23'), ('122','13'), ('138','21'), ('103','5'), ('122','6'), ('165','10'), ('105','18'), ('112','3'), ('189','10'), ('103','9'), ('187','7'), ('129','22'), ('142','4'), ('168','13'), ('109','14'), ('185','20'), ('172','17'), ('190','5'), ('196','5'), ('183','17'), ('109','1'), ('125','16'), ('160','2'), ('134','6'), ('193','6'), ('185','4'), ('119','1'), ('159','7'), ('177','16'), ('169','9'), ('107','21'), ('182','16'), ('128','6'), ('145','6'), ('172','22'), ('109','16'), ('166','13'), ('102','8'), ('148','4'), ('122','8'), ('177','21'), ('147','5'), ('154','16'), ('101','2'), ('140','14'), ('190','1'), ('161','5'), ('102','1'), ('113','19'), ('123','3'), ('166','19'), ('128','15'), ('149','22'), ('121','5'), ('171','15'), ('155','12'), ('108','9'), ('106','7'), ('142','2'), ('133','14'), ('164','16'), ('101','7'), ('162','8'), ('200','8'), ('117','21'), ('176','16'), ('103','10'), ('119','12'), ('126','23'), ('167','5'), ('115','3'), ('197','9'), ('164','17'), ('101','22'), ('198','1'), ('119','6'), ('150','10'), ('188','10'), ('174','12'), ('165','13'), ('103','12'), ('113','2'), ('130','5'), ('170','12'), ('121','23'), ('174','19'), ('119','13'), ('187','11'), ('186','2'), ('183','16'), ('199','11'), ('168','1'), ('191','17'), ('148','12'), ('166','18'), ('133','11'), ('199','13'), ('158','14'), ('160','22'), ('106','9'), ('130','15'), ('115','2'), ('183','10'), ('171','22'), ('119','23'), ('194','9'), ('147','12'), ('118','14'), ('120','24'), ('119','1'), ('163','2'), ('109','9'), ('143','15'), ('149','14'), ('194','14')\
	");

	//sets up links between some users
	connection.query("\
	INSERT INTO `likes` VALUES ('102','200','0'), ('102','198','1')\
	");

	//puts pictures in for people
	connection.query("\
	INSERT INTO `pictures` VALUES ('1','https://i.pravatar.cc/300?img=*','181'), ('2','https://i.pravatar.cc/300?img=*','106'), ('3','https://i.pravatar.cc/300?img=*','189'), ('4','https://i.pravatar.cc/300?img=*','167'), ('5','https://i.pravatar.cc/300?img=*','128'), ('6','https://i.pravatar.cc/300?img=*','132'), ('7','https://i.pravatar.cc/300?img=*','125'), ('8','https://i.pravatar.cc/300?img=*','200'), ('9','https://i.pravatar.cc/300?img=*','184'), ('10','https://i.pravatar.cc/300?img=*','186'), ('11','https://i.pravatar.cc/300?img=*','198'), ('12','https://i.pravatar.cc/300?img=*','120'), ('13','https://i.pravatar.cc/300?img=*','101'), ('14','https://i.pravatar.cc/300?img=*','177'), ('15','https://i.pravatar.cc/300?img=*','197'), ('16','https://i.pravatar.cc/300?img=*','138'), ('17','https://i.pravatar.cc/300?img=*','126'), ('18','https://i.pravatar.cc/300?img=*','114'), ('19','https://i.pravatar.cc/300?img=*','191'), ('20','https://i.pravatar.cc/300?img=*','133'), ('21','https://i.pravatar.cc/300?img=*','187'), ('22','https://i.pravatar.cc/300?img=*','171'), ('23','https://i.pravatar.cc/300?img=*','121'), ('24','https://i.pravatar.cc/300?img=*','119'), ('25','https://i.pravatar.cc/300?img=*','199'), ('26','https://i.pravatar.cc/300?img=*','105'), ('27','https://i.pravatar.cc/300?img=*','124'), ('28','https://i.pravatar.cc/300?img=*','115'), ('29','https://i.pravatar.cc/300?img=*','116'), ('30','https://i.pravatar.cc/300?img=*','188'), ('31','https://i.pravatar.cc/300?img=*','193'), ('32','https://i.pravatar.cc/300?img=*','150'), ('33','https://i.pravatar.cc/300?img=*','165'), ('34','https://i.pravatar.cc/300?img=*','153'), ('35','https://i.pravatar.cc/300?img=*','190'), ('36','https://i.pravatar.cc/300?img=*','104'), ('37','https://i.pravatar.cc/300?img=*','156'), ('38','https://i.pravatar.cc/300?img=*','192'), ('39','https://i.pravatar.cc/300?img=*','182'), ('40','https://i.pravatar.cc/300?img=*','137'), ('41','https://i.pravatar.cc/300?img=*','180'), ('42','https://i.pravatar.cc/300?img=*','129'), ('43','https://i.pravatar.cc/300?img=*','176'), ('44','https://i.pravatar.cc/300?img=*','134'), ('45','https://i.pravatar.cc/300?img=*','178'), ('46','https://i.pravatar.cc/300?img=*','147'), ('47','https://i.pravatar.cc/300?img=*','136'), ('48','https://i.pravatar.cc/300?img=*','131'), ('49','https://i.pravatar.cc/300?img=*','145'), ('50','https://i.pravatar.cc/300?img=*','155'), ('51','https://i.pravatar.cc/300?img=*','183'), ('52','https://i.pravatar.cc/300?img=*','144'), ('53','https://i.pravatar.cc/300?img=*','122'), ('54','https://i.pravatar.cc/300?img=*','164'), ('55','https://i.pravatar.cc/300?img=*','173'), ('56','https://i.pravatar.cc/300?img=*','117'), ('57','https://i.pravatar.cc/300?img=*','163'), ('58','https://i.pravatar.cc/300?img=*','127'), ('59','https://i.pravatar.cc/300?img=*','107'), ('60','https://i.pravatar.cc/300?img=*','135'), ('61','https://i.pravatar.cc/300?img=*','159'), ('62','https://i.pravatar.cc/300?img=*','175'), ('63','https://i.pravatar.cc/300?img=*','109'), ('64','https://i.pravatar.cc/300?img=*','103'), ('65','https://i.pravatar.cc/300?img=*','139'), ('66','https://i.pravatar.cc/300?img=*','157'), ('67','https://i.pravatar.cc/300?img=*','111'), ('68','https://i.pravatar.cc/300?img=*','172'), ('69','https://i.pravatar.cc/300?img=*','146'), ('70','https://i.pravatar.cc/300?img=*','194'), ('71','https://i.pravatar.cc/300?img=*','174'), ('72','https://i.pravatar.cc/300?img=*','151'), ('73','https://i.pravatar.cc/300?img=*','179'), ('74','https://i.pravatar.cc/300?img=*','112'), ('75','https://i.pravatar.cc/300?img=*','185'), ('76','https://i.pravatar.cc/300?img=*','162'), ('77','https://i.pravatar.cc/300?img=*','196'), ('78','https://i.pravatar.cc/300?img=*','141'), ('79','https://i.pravatar.cc/300?img=*','161'), ('80','https://i.pravatar.cc/300?img=*','154'), ('81','https://i.pravatar.cc/300?img=*','113'), ('82','https://i.pravatar.cc/300?img=*','195'), ('83','https://i.pravatar.cc/300?img=*','152'), ('84','https://i.pravatar.cc/300?img=*','166'), ('85','https://i.pravatar.cc/300?img=*','108'), ('86','https://i.pravatar.cc/300?img=*','142'), ('87','https://i.pravatar.cc/300?img=*','170'), ('88','https://i.pravatar.cc/300?img=*','118'), ('89','https://i.pravatar.cc/300?img=*','158'), ('90','https://i.pravatar.cc/300?img=*','102'), ('91','https://i.pravatar.cc/300?img=*','149'), ('92','https://i.pravatar.cc/300?img=*','148'), ('93','https://i.pravatar.cc/300?img=*','130'), ('94','https://i.pravatar.cc/300?img=*','160'), ('95','https://i.pravatar.cc/300?img=*','168'), ('96','https://i.pravatar.cc/300?img=*','143'), ('97','https://i.pravatar.cc/300?img=*','123'), ('98','https://i.pravatar.cc/300?img=*','110'), ('99','https://i.pravatar.cc/300?img=*','140'), ('100','https://i.pravatar.cc/300?img=*','169'),('101','https://www.eurekalert.org/multimedia/pub/web/37173_web.jpg','162'),('102','https://imaging.broadway.com/images/regular-43/w400/105136-11.png','114'),('103','https://static5.businessinsider.com/image/4f75cdb869bedd2a53000046/the-infamous-alabama-face-guy-wants-to-be-president-of-the-university-of-alabama-now.jpg','144')\
	");

	//sets all test users' profile pic to be the first picture in the database
	connection.query("\
	UPDATE users SET profile_pic_id = 1\
	");

	connection.query("\
	UPDATE users SET profile_pic_id = 101\
	WHERE id = 162\
	");

	connection.query("\
	UPDATE users SET profile_pic_id = 102\
	WHERE id = 114\
	");

	connection.query("\
	UPDATE users SET profile_pic_id = 103\
	WHERE id = 144\
	");

	connection.query("\
	UPDATE users SET profile_pic_id = NULL\
	WHERE id = 111\
	");

	connection.query("\
	UPDATE users SET verified = 1\
	");

	connection.query("\
	INSERT INTO conversations (user1, user2) VALUES(1, 1)\
	");

	for (var i = 101; i <= 200; i++){
		var fame = Math.floor(Math.random() * 21);
		connection.query(`UPDATE users SET fame = ${fame} WHERE id = ${i}`);
		connection.query(`INSERT INTO history (viewer_id, viewed_id) VALUES (${i},${i})`);
	}


	console.log('Sucess!');
	console.log('Exiting...');
	connection.end();
})