const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
});



connection.connect(function (err) {
    if (err) throw err

    console.log('Creating matcha_db database...')
    connection.query('DROP DATABASE IF EXISTS matcha_db');
    connection.query('CREATE DATABASE matcha_db');
    connection.changeUser({database : 'matcha_db'}, function(err) {
      if (err) throw err;
    });

    console.log('Initiating tables...')
    connection.query('DROP TABLE IF EXISTS users');
    connection.query('DROP TABLE IF EXISTS pictures');
    connection.query('DROP TABLE IF EXISTS history');
    connection.query('DROP TABLE IF EXISTS likes');
    connection.query('DROP TABLE IF EXISTS notifications');
    connection.query('DROP TABLE IF EXISTS history');
    connection.query('DROP TABLE IF EXISTS msgs');

    connection.query("CREATE TABLE `users`\
    (`id` int(9) unsigned NOT NULL AUTO_INCREMENT,\
    `user_name` varchar(100) NOT NULL,\
    `password` varchar(255) NOT NULL,\
    `first_name` varchar(100) NOT NULL,\
    `last_name` varchar(100) NOT NULL,\
    `email` varchar(100) NOT NULL,\
    `age` int(9) unsigned NOT NULL,\
    `gender` decimal(3,2) unsigned NOT NULL,\
    `pref` decimal(3,2) unsigned NOT NULL,\
    `gps_lon` decimal(5,3) NOT NULL,\
    `gps_lat` decimal(5,3) NOT NULL,\
    `interests` tinytext NOT NULL,\
    PRIMARY KEY (`id`))\
    ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;");

    connection.query('CREATE TABLE pictures\
    (id int NOT NULL AUTO_INCREMENT,\
    pic longtext,\
    user_name varchar(255),\
    PRIMARY KEY (id))');

    connection.query('CREATE TABLE history\
    (viewer_id int NOT NULL,\
    viewed_id int NOT NULL)');

    connection.query('CREATE TABLE likes\
    (user1_id int NOT NULL,\
    user2_id int NOT NULL,\
    link int)');

    connection.query('CREATE TABLE notifications\
    (user_id int NOT NULL,\
    noti varchar(255),\
    viewed_status int)');

    connection.query('CREATE TABLE msgs\
    (id int NOT NULL AUTO_INCREMENT,\
    user1_id int NOT NULL,\
    user2_id int NOT NULL,\
    msg varchar(1000),\
    PRIMARY KEY (`id`))');

    console.log('Creating fake profiles...')

    connection.query("INSERT INTO `users` VALUES\
    ('1','goldner.floyd','ca94a20769d9e25b1165d397103435bbc185cd4e','Michelle','Baumbach','ike.marvin@example.net','115','0.06','0.02','86.575','-80.145','Quod rerum iste sint totam omnis eum nam eveniet. Et ut illo illo ut sint cum porro. Delectus temporibus aut repellendus aut corrupti et ut. Temporibus eum ipsam mollitia commodi nobis quia aut.'),\
    ('2','mcdermott.viola','44915654f856ad1180e4709c69de19b50167037a','Loraine','Douglas','oullrich@example.net','39','0.62','0.82','10.938','-80.012','Dolor possimus totam voluptas omnis vel. Fugiat qui iusto soluta beatae officiis. Eligendi doloribus rerum cupiditate illo doloremque tempora molestiae et.'),\
    ('3','antonina.brown','a343fe2bd36470880fa38560847db05de9aa5e6f','Joanie','Halvorson','zgislason@example.net','38','0.30','0.81','-64.124','-60.043','Harum corporis quis est labore consequatur totam. Possimus aut quam sed. Doloribus et aspernatur vero numquam ducimus officia. Totam reiciendis quae rerum eaque.'),\
    ('4','robert.hamill','07d39b6914f72d214f89a34990fd7706be422e9c','Lilyan','Jakubowski','maxine.kshlerin@example.com','74','0.61','0.29','-99.999','-2.541','Consequatur quos qui quidem et quia. Dolorem magnam est iusto molestiae eos dolores. Fugit sed quia modi et quia omnis autem aut.'),\
    ('5','belle88','e6ed2786ac7c1518a52f600721b7e71ff94a8f65','Earnest','Grady','udicki@example.com','56','0.95','0.97','65.916','-63.598','Repudiandae harum soluta occaecati itaque assumenda occaecati. Quia sit iste dolorum aut quisquam. Eveniet necessitatibus nihil nesciunt vel dolores iure. Fugit cumque at possimus pariatur.'),\
    ('6','susana.lindgren','aba516e023aba6fd8fcf7b827a4007c7727ac15b','Cathryn','Wolf','ptremblay@example.net','67','1.00','0.97','99.999','-75.804','Commodi rerum iusto corrupti neque ut quas. Quis possimus sed aliquam ut. Qui unde eos doloribus voluptatibus ullam. Voluptatem facilis dolorem qui officia eos.'),\
    ('7','pierce69','0a8d2264274556a4651ddfb478c8d2ec5f458910','Abraham','Ferry','halvorson.kennedy@example.net','64','0.00','0.56','-99.999','-5.609','Nisi ut et quibusdam laborum mollitia aut et. Aspernatur dolore delectus velit dolor aliquam. Autem natus voluptatem debitis eum ex nostrum non soluta.'),\
    ('8','barton.virginie','80584c9b053b8ee9f71e3aef11a4308065cca800','Yasmeen','Frami','bertram80@example.net','89','0.54','0.11','-99.999','44.320','Et dolores sint optio consequuntur aliquam consequatur quod. Omnis ratione omnis odio esse reiciendis corrupti. Nihil nihil tempore quo est consequatur eos.'),\
    ('9','wromaguera','5331618aed52fbbfdf44bd7995ee9a9db23301b6','Marcelle','Welch','eladio.runolfsdottir@example.org','69','0.90','0.44','-99.999','0.933','Est quasi et ex possimus. Facilis hic et beatae soluta quia enim eos. Recusandae dicta error sed. Et repellat sed voluptatem repellendus.'),\
    ('10','emmie.rodriguez','8ac30033fbf7e3b9e37a68323562716b15e236b7','Toby','Mueller','filiberto25@example.net','44','0.36','0.09','0.887','83.080','Quia atque ad exercitationem repudiandae molestiae atque. Dolorum suscipit ad saepe quam illum dignissimos odio. Ad dolores qui labore sit. At quidem ut eaque ipsam ipsam quas.'),\
    ('11','ypacocha','f599c18f0428042f2f113eb340d924f53f67989e','Nicholas','Denesik','emile91@example.net','45','0.78','0.48','-99.999','23.306','Voluptatum exercitationem quibusdam ea nam rerum dolore qui esse. Doloremque aut atque neque qui nihil corrupti id.'),\
    ('12','rodriguez.edna','41af45244f6d2efb35cb7b3f02f945efe592a411','Colt','Ziemann','abraham07@example.org','99','0.89','0.86','99.999','-51.937','Ipsum neque maxime est temporibus. Distinctio dolorem praesentium quasi distinctio blanditiis tempora aut. Sit odit possimus et in velit perspiciatis animi.'),\
    ('13','eda93','cc6dac744fe22e3bea90abc2a72420549714b830','Dora','Mertz','ceasar.morissette@example.net','74','0.94','0.66','-28.954','-53.848','Voluptas qui labore praesentium amet. Sint magni voluptatem quasi omnis. Consequatur tenetur in eligendi magnam asperiores voluptatem. Ipsam quis et aut reiciendis voluptate.'),\
    ('14','swaniawski.litzy','57a7bcaae410b671c58ba1b993eccc4b31c66afa','Marguerite','Wiza','nichole62@example.org','116','0.51','0.31','-81.209','-45.612','Vitae aut ducimus ea voluptatem. Nulla nam quas consequatur velit provident possimus beatae.'),\
    ('15','scottie57','088fb7758b9dbf10f23840eadfab8987229a2e1d','Cleve','Lind','ernesto76@example.net','19','0.82','0.06','21.292','-37.171','Ipsam necessitatibus a et quibusdam voluptatem et vitae. Qui aspernatur rerum vel in mollitia alias. Velit et voluptas maiores sit nobis beatae.'),\
    ('16','shanie.koch','d79ffa3527d61ed7bf5ba8bd91fccb656063cc5a','Alta','Keefe','barry28@example.org','89','0.13','0.22','-99.999','36.695','Molestiae dicta delectus cupiditate quis consectetur sit quod eaque. Vero aliquam animi atque. Molestiae dolorem veniam eum est enim.'),\
    ('17','odonnelly','a354e28430e46d903c7a632b0bf53d3dfd3cc79c','Damien','Bartoletti','windler.afton@example.net','87','0.78','0.65','39.169','-55.881','Dolores rerum voluptatem facilis est similique. Modi repellat quis magnam possimus quis.'),\
    ('18','nikita36','b624c2a26df1e3d333d09e44af3f9c9e9e8bee50','Reba','Sauer','ciara.hayes@example.com','80','0.87','0.45','-7.739','-36.685','Porro quam officia mollitia laudantium. Et vitae maxime quia corporis. Eum eaque beatae facere laboriosam magnam quo.'),\
    ('19','vandervort.vergie','6edb364fec1fda80239c964ab9df31a471e4fd8a','Rodrigo','Roberts','xlarkin@example.org','33','0.03','0.61','-11.488','-31.494','Et occaecati sint a saepe error sint. Ullam et voluptatum repellendus autem atque. Rerum reprehenderit eum incidunt iure dolore aut dolor. Et illum eos eaque facilis labore laborum quia.'),\
    ('20','general22','e8024df329c5ee5be9f53fe661fbc0cb0f2753c0','Zena','Murray','boehm.luigi@example.net','19','0.65','0.37','2.785','-48.335','Rerum incidunt qui occaecati error inventore nam voluptates et. Tempora excepturi atque molestias et rerum quos. Sit illo sunt autem omnis voluptate pariatur.'),\
    ('21','feest.larue','36ff48d229883cc21a2b52ef83bb02f0fb337a60','Malcolm','Lehner','emilie58@example.net','83','0.06','0.69','-99.999','-59.871','Inventore corrupti beatae molestiae ex autem enim. Aperiam in quos vel aut numquam et. Quos in sit ipsum blanditiis.'),\
    ('22','stiedemann.burdette','326133cd285260fe1e0babb1a504ba7de1e75670','Laurence','Swift','abeier@example.net','89','0.74','0.45','-99.999','-6.783','Repellendus recusandae sit amet ullam omnis. Possimus enim neque autem dolorem. Hic aut voluptate tenetur. Sed porro maiores consequatur non. Est voluptas ea modi minus.'),\
    ('23','lmorar','0c5b3f41918c9d1553d550c08465b86171889789','Jerad','Murphy','hudson.lubowitz@example.net','46','0.37','0.70','-99.999','48.295','Magni veniam necessitatibus iste repudiandae enim ea optio. Doloremque fugiat culpa et tempore. Quia vero mollitia numquam et.'),\
    ('24','cstroman','c8e162a9d837fecf6ffcdedf4c8a84092c8aab73','Katelyn','Langworth','davis.susana@example.net','29','0.12','0.06','-99.999','0.695','Distinctio eveniet tenetur id repudiandae dignissimos distinctio quasi ratione. Culpa est aut consequuntur. Molestiae facilis esse maxime sit et.'),\
    ('25','arvid.davis','5585da8cf868e1228f2ed6234966c29ad94ba849','Bernie','Farrell','trystan77@example.org','89','0.20','0.80','17.862','40.763','Accusamus sapiente doloremque dolorem. Voluptatem doloremque ad et sunt atque nulla dolorem omnis. Voluptatem ut corrupti doloribus quis.'),\
    ('26','tavares21','8f2eac5948333e808bd5f741502c71f8d95d0447','Dovie','Schuster','oschuppe@example.net','48','0.19','0.37','-99.999','-52.613','Ab fugiat eaque ab laboriosam iste. Distinctio rerum aliquid quibusdam voluptas doloribus aliquid. Aut illo enim ipsum et perferendis.'),\
    ('27','kelton.schinner','97a4f761940701b9dc2bbba3ac4812c057c96557','Wilburn','Marks','earnest49@example.org','25','0.52','0.54','75.757','-86.323','Dicta nobis nisi excepturi. Est saepe eius quia dolore.\nNon exercitationem eligendi numquam. Rerum est exercitationem saepe iure accusamus molestias qui. Quia accusantium tenetur architecto voluptas.'),\
    ('28','bogan.jazmin','2478911306a338f7def39566b0d23e740f13de48','Palma','Haley','edythe11@example.net','23','0.79','0.75','43.288','16.287','Aliquam expedita est similique deleniti delectus et nisi. Et magni cum reprehenderit quaerat alias enim. Iusto nisi dolores qui natus. Odio porro doloremque quia tenetur ea voluptatem sint.'),\
    ('29','larmstrong','2553bcacb6a8818f42127f30d1f0771eb8db879a','Hillary','Rath','karen.morissette@example.net','58','0.02','0.83','-99.999','-15.545','Dolor aperiam quibusdam fuga inventore est ut debitis. Atque corporis non nesciunt sunt. Sed alias quaerat perspiciatis facilis eaque facere.'),\
    ('30','simeon.jacobs','d99545382d25f095d10565f23bb4d2eee28299f8','Tina','Grant','hartmann.juanita@example.net','75','0.15','0.67','99.999','-1.390','Aut dolorem est quos molestias occaecati. Neque distinctio et blanditiis eum nisi. Quae mollitia omnis suscipit iure.'),\
    ('31','shyatt','75d84cfa4dcdfc39809bb7657d8c1dff38721eb9','Akeem','Wintheiser','annabelle.predovic@example.org','98','0.40','0.52','-57.281','-63.621','Sit ut et repudiandae nesciunt est corporis rerum. Ab vel minus facere expedita. Itaque cum aspernatur ut. Et saepe fuga iure exercitationem non.'),\
    ('32','tommie.marvin','ceedb2c12ca113cdcf94c1405ae6744fe11bdcda','Hilbert','Zboncak','turcotte.sigurd@example.net','72','0.55','0.06','99.999','-86.750','Aliquam natus aut rerum cumque sunt. Error facilis sunt dolores aut quia quia neque. Velit ab ex iste laboriosam natus. Aut omnis consequuntur iure aut fugiat incidunt.'),\
    ('33','rogahn.michele','510cd3ab443baa1f4bca08023b9a8bb43a6fcefd','Jaylon','Gulgowski','watson90@example.org','96','0.35','0.33','21.284','-28.855','Dolor atque qui quisquam non dolor sit ut. Ab voluptas qui est doloribus. Iure voluptatem veritatis aut maxime et aut aut ut.'),\
    ('34','nicolas.alda','d7a2787d9ae73b50485b930fcec3d7f5da93eec1','Leopold','Erdman','marvin.alvina@example.net','85','0.26','0.47','-30.041','20.831','Eius velit debitis id eaque deleniti. Quisquam sed ipsum harum non rerum quos autem. Omnis velit sed aut voluptatem inventore.'),\
    ('35','angelo12','24d3d91a6550987a9b16ed4ff4e1d3112564e373','Emile','Tillman','fae.mraz@example.net','27','0.71','0.77','84.119','23.520','Illum expedita dolores quo doloribus numquam iusto qui enim. Voluptatibus molestiae repellendus adipisci soluta eaque facilis. In inventore consequatur quod sequi. Voluptas ullam quos culpa.'),\
    ('36','djacobi','7fb25f4967149f4f936a51ac352ef1311989735f','Jakob','Kozey','loy.schmitt@example.com','23','0.74','0.07','-99.999','-37.224','Quam natus quibusdam ullam atque nemo nisi reiciendis eum. Omnis est et eum quos. Minima eos occaecati enim modi quidem possimus.'),\
    ('37','dgleichner','0291d777973f272f749c375edc2ac2ba73681ed7','Lou','Orn','pagac.meredith@example.org','85','0.53','0.92','99.999','64.012','Qui quod voluptas culpa. Non accusantium necessitatibus ut impedit totam eaque maxime quia. Laborum sit cumque et quidem veritatis.'),\
    ('38','lparker','ab438b1d53e43f003f9183da239f8566ef0b2625','Delilah','Nicolas','pfranecki@example.com','36','0.18','0.49','99.999','14.983','Enim aliquid sunt eos aut ut aut quia. Voluptatem ea excepturi illo est rerum. Velit ducimus sapiente veniam corporis.'),\
    ('39','heaney.paolo','1d87b913128b3cf813da1afdcc52b8aed20a6045','Layla','Nienow','lheidenreich@example.net','20','0.38','0.05','51.409','70.362','Voluptates sed omnis est est non distinctio. Totam facilis dolore et. Voluptatibus quas vel porro facilis laudantium recusandae hic quia. Et autem aut minima est doloremque dolorem tenetur.'),\
    ('40','ashlynn74','4e1998cd1c3b0588513b8fe30b493ea90eddc4ff','Damaris','Jacobson','cummerata.floy@example.net','85','0.43','0.15','99.999','31.065','Cupiditate nisi cupiditate vel enim. Veritatis ab laudantium harum quia dolor quasi. Et magnam distinctio autem et accusantium.'),\
    ('41','ffeeney','d0c22a06ac148d21d7c3e248deefde2841b1bae5','Luz','Maggio','qbrakus@example.net','42','0.52','0.16','-87.160','22.777','Magnam voluptatem suscipit ex. Maiores nobis est rerum molestias commodi nostrum. Eaque natus est ea molestiae excepturi quo nemo sit.'),\
    ('42','lparisian','5905594a1c5a3d1c7c40531b94eff5f7229f71e0','Cortney','Denesik','hhamill@example.com','83','0.95','0.08','18.102','45.531','Et earum tenetur explicabo eum quia nesciunt sed. Et est sint natus. Et autem aut dolorum autem recusandae sed similique.'),\
    ('43','kemmer.alphonso','8430e80f3c16618e0a1e344067284ba62ee15ae5','Cayla','Satterfield','upton.ashly@example.com','19','0.47','0.20','88.562','-27.106','Tenetur minus consectetur voluptatibus ipsam et sapiente quia. Ad provident dignissimos error eaque sapiente magni. Est quo quis sit mollitia corrupti. Nostrum sint nisi eos deserunt est et saepe.'),\
    ('44','gonzalo.price','2d9757827dc49f84112a79f4f39ae552e35d31bb','Elise','Jast','kamren83@example.org','100','0.73','0.50','-99.999','52.220','Est cupiditate illo officiis aliquam. Dolor sapiente similique itaque sunt laborum. Enim sequi quidem dolor fugiat. Quis dolor ipsum omnis quas.'),\
    ('45','assunta.carter','e9624989d34a84bea8ade23d425672190a7ae407','Julius','Blanda','raven.schowalter@example.net','80','0.55','0.22','-3.373','-31.748','Minus iure ut eligendi sunt itaque. Et perferendis qui et qui eius sapiente.\nEos inventore quam vitae magni qui est quo. Illo laborum consequuntur corrupti rem tempora.'),\
    ('46','magali75','543936ea7c2b1839eedaf03d2fd87ea83b2f694d','Joanny','Bradtke','mlittle@example.com','30','0.86','0.90','-5.915','-52.072','Alias dolor dolore quisquam recusandae. Accusantium nisi omnis et pariatur similique aliquid non id. Aliquid qui corrupti corporis. Sequi qui omnis hic ut itaque repudiandae.'),\
    ('47','annabell43','f565b2e5d591023d5396f1aa99ab41cc0a234e6e','Maximillia','Kohler','erick32@example.com','42','0.90','0.76','-12.716','-5.433','Molestias expedita provident fugit. Minima consequatur nobis voluptate quia commodi. Dolor architecto fuga magnam nihil suscipit qui. Consectetur cum dicta quo natus laboriosam ut cupiditate.'),\
    ('48','edwin.feil','e3edb69b86b2b278ccae26a5dac6ba01828e88e7','Allen','Dach','enrique97@example.com','39','0.07','0.00','17.358','49.438','Officia molestiae error aut sint molestiae. Omnis debitis quo enim sequi dolorum enim. Animi qui non molestiae dolorem incidunt fuga et consectetur. Ipsum dolor quaerat enim quibusdam esse harum.'),\
    ('49','leland.gleichner','426156f7ca189545082a9d93c8c72d611f04858a','Lila','Stehr','rau.colleen@example.org','34','0.53','0.11','99.999','23.313','Rerum beatae nemo rerum rerum. Aperiam fuga asperiores deserunt fugit maxime temporibus. Magni sed laborum aut debitis repellendus.'),\
    ('50','joaquin86','3e972f5f249c3fbe1eaa176a4fd3f874bb30b0ef','Bernard','Batz','domenic.hamill@example.com','26','0.29','0.97','-99.999','-34.511','Cumque et blanditiis eius neque vel ut maxime. Nobis eos fuga debitis natus nihil deleniti dolores odit.'),\
    ('51','zula43','b6b74d9bec8cb863f56119679123a8c6e6fd04dd','Jacques','West','parker.marco@example.org','34','0.61','0.16','99.999','-67.602','Aperiam rerum laborum eaque sunt quas totam. Ut in est et consequatur sapiente.'),\
    ('52','hilll.coleman','58a9fb3a922fe8315487c22c87520c5da6e41648','Isaias','Dooley','ortiz.zoe@example.org','57','0.74','0.74','81.404','71.620','Dolores in est laudantium optio. Nihil voluptatem quasi consequatur. Nisi nulla recusandae quia eum molestias. Incidunt et fugit voluptatem velit vitae repudiandae aut.'),\
    ('53','schumm.neil','9e385ba5f3a9dd145f27ae4e862eb451a70d57ad','Louisa','Schowalter','cbahringer@example.net','102','0.41','0.14','99.038','18.165','Eius maiores sapiente odio ducimus. Exercitationem animi distinctio commodi repellat illum earum. Quia ab provident quia voluptates in.'),\
    ('54','pkuhic','27298e6f911dddac5119a816f06f96cd46116834','Danial','Kuhn','sdaniel@example.net','37','0.01','0.00','-99.999','87.806','Commodi velit nam animi rem vel occaecati. Quia exercitationem sed doloremque ea laborum recusandae aliquid. Quo voluptas praesentium at sint vitae minus quos qui.'),\
    ('55','macejkovic.laury','9e9bc39aeaebb489da1acfb203d05f348c5a9e17','Giles','Larson','carmella00@example.com','87','0.04','0.95','99.999','-43.557','Totam omnis asperiores dolor dolore voluptate. Similique sint ut ex explicabo sed commodi a. Eligendi consequatur dolorem doloremque aperiam distinctio aut.'),\
    ('56','xcruickshank','edcf3f2d61ade8125992379e2aaf4fdcc815cafa','Maryse','Wisozk','ehegmann@example.com','105','0.73','0.12','-80.221','16.184','Voluptatem consequuntur at in autem optio praesentium cumque. Itaque ut consequatur ut sed fuga.'),\
    ('57','btromp','86d00b73cd1bb148fdd3340c300b9c005b88c8c9','Alfonso','Keeling','verona.grady@example.org','90','0.56','0.07','-35.090','18.605','Dicta quas ipsum soluta et explicabo et dolorum. Nostrum magnam ut cumque eveniet. Esse omnis et soluta saepe non fuga. Et est necessitatibus et enim.'),\
    ('58','maritza.wiza','3162d825849b3a7fd3b45d3a04536d518d0d7449','Dina','Marks','marina.schoen@example.net','87','0.34','0.32','64.855','64.668','Soluta quae est quia est corporis ratione. Cupiditate non et est aperiam distinctio. Amet adipisci debitis enim vero dolorem numquam aut a.'),\
    ('59','sibyl87','74e19d5e73b8e3c4adf6b7b4a1e9a9a85859e433','Gerald','Jacobi','koelpin.rashawn@example.com','19','0.08','0.40','-99.999','2.727','Qui repellat laboriosam modi provident. Laudantium quo rerum voluptas voluptatum illo inventore. Et alias amet eos cupiditate facilis.'),\
    ('60','zjohnston','4af15c712f094ef598040747094a26b1c58e7a90','Noe','Price','katelynn.murphy@example.org','116','0.01','0.39','-99.999','60.410','Modi illum et enim excepturi impedit provident. Non autem tenetur asperiores non accusamus ratione eveniet. Repudiandae eveniet libero in occaecati soluta.'),\
    ('61','werner.greenfelder','eef0cd48ce874cb1e38b51732c4a9d9341d2cf83','Jenifer','Connelly','hester.roob@example.com','65','0.15','0.64','-99.999','53.109','Recusandae error qui est quidem. Illum accusantium inventore aut sed eum aut. Nulla nulla omnis esse ut velit quis quos. Qui repudiandae sint accusantium facere ipsa et facilis.'),\
    ('62','mrosenbaum','f34faad89f25d341e875a734e9d859793a6c68fc','Kris','Crona','connelly.jeffry@example.org','62','0.60','0.69','99.999','-1.331','Quia mollitia eaque et error inventore et ut. Non eveniet eos eos ut.'),\
    ('63','brooks.macejkovic','7273f7e1b5af2ddc3405bb3cfd5bd95d3007a047','Baylee','DuBuque','wilderman.jailyn@example.net','108','0.07','0.15','-11.909','67.101','Et aliquid et laudantium reprehenderit cumque aut. Error pariatur architecto ea nobis deserunt tempore atque. Vel et error qui exercitationem enim.'),\
    ('64','mmohr','763ca49f80ec30f6d3594006158cc8ef1e4af966','Kiana','Padberg','nannie.goodwin@example.net','93','0.85','0.15','-99.999','-71.689','Hic necessitatibus quam sapiente aperiam delectus et maiores. Ratione et quos corrupti et. Perferendis eius minima officia voluptate voluptas corporis eum. Eveniet libero animi odio ut.'),\
    ('65','lakin.carolyne','4ba909174bc072e437fd2ca8837b675482b8b5a7','Aiden','Kozey','odessa30@example.net','61','0.45','0.88','-14.801','-13.729','Non sit placeat aut. Sint rem alias et. Voluptatem ullam unde cupiditate necessitatibus. Quia voluptate consequatur ut libero magnam alias. Beatae qui in assumenda tenetur.'),\
    ('66','block.jovany','f398fabf4be87c91ff737c472b78c81ec062baec','Freida','Collins','weissnat.leanna@example.org','53','0.09','0.95','-99.999','42.910','Corrupti explicabo et molestiae quaerat. Labore laborum doloribus magnam voluptatem voluptatem illum est. Sit cumque odit consequatur eveniet ipsa et.'),\
    ('67','jillian.senger','236b9a6415195947e9a714c76b1b64ec7aec971d','Devin','Barrows','jaunita.feest@example.com','72','0.77','0.56','99.999','-15.561','Dolorum molestiae deserunt est ut pariatur. Nihil minima et quia nesciunt odio veniam non. Necessitatibus est eum soluta debitis molestiae quibusdam.'),\
    ('68','emilia18','220fbb6d786606133184ace2e86f88e3a843e0c3','Dewayne','Johnson','leann99@example.org','64','0.32','0.05','99.999','-23.628','Asperiores voluptates id est asperiores eum ea eveniet voluptatem. Voluptatem molestias repudiandae et et aut. Autem animi qui ab nobis quidem.'),\
    ('69','kessler.daron','4e7ca06a581f35357cff6fef61579876ed37c0e7','Dorris','Rempel','kreiger.robin@example.com','46','0.23','0.51','-5.796','85.392','Iste accusantium qui quia officia. Aut soluta qui optio accusantium cumque voluptatem ad. Ut nam quisquam id porro ipsam.'),\
    ('70','xkon','ccdb37a12c42188b7e9d869f9c955b1f81bf8b47','Fritz','Schmeler','daisha23@example.net','83','0.78','0.90','64.706','-13.582','Facere vitae nisi quis corporis necessitatibus repellendus. Sequi provident rerum eaque et dolorem hic. At tempora natus officia facilis molestiae.'),\
    ('71','will16','b3c72bbc24c23bab4a4e02ebec2c47107d6e01b8','Junior','Berge','casper.sheila@example.org','53','0.46','0.37','-67.137','-79.043','Nobis reprehenderit accusamus consequatur est itaque. Quia ut et dolor illum. Vel et ut ullam rerum.\nSunt et aspernatur ex ut dolor. Sit et consequatur enim totam. Ab alias rem quam harum et.'),\
    ('72','atromp','995d457533bead3c409942ad9436af284a0e3d88','Audreanne','Zemlak','frankie.ryan@example.org','53','0.06','0.39','-50.730','56.758','Incidunt quia sit doloribus repudiandae. Consectetur voluptate voluptatem libero voluptatem illum. Voluptatibus veritatis repudiandae omnis ut.'),\
    ('73','hillary84','b242cc6d6ae2dae0b9ebbec42ba09192075b6a85','Darren','Effertz','janiya.tromp@example.com','72','0.40','0.97','-99.999','-1.631','Quisquam eum eos magnam est at dolorem et et. Quaerat amet similique non aut ad sequi. Molestiae asperiores vel commodi nulla cupiditate nostrum autem.'),\
    ('74','dayna57','b56d76c8ecbed8d427b61447aa10f7f40824094e','Zakary','Shanahan','cassandre28@example.com','20','0.66','0.73','89.058','73.835','Delectus iste doloremque officiis voluptate ut. Eligendi voluptates molestiae laboriosam sed ut aut consequatur. Ut dolores quia et eos.'),\
    ('75','ray94','1e54a2dbcb920c74b1ce5e5a0694bb23d954b9ed','Skyla','Keeling','simonis.brendan@example.net','59','0.87','0.40','71.245','-84.194','Vel nam aperiam sed fuga non. Aut culpa alias sunt eum nulla corrupti. Fugiat provident natus vero fugit vel quaerat dolor.'),\
    ('76','ethyl.schowalter','d99121253ad116cc7db6649d8fc7ced37aeb03b7','Kamryn','Okuneva','anais42@example.net','106','0.50','0.84','-26.910','28.169','Nobis mollitia aut quia dicta accusantium. Eum culpa odit et expedita sequi. Temporibus vel recusandae voluptas in eaque. Non mollitia labore est sit vitae voluptates minima reiciendis.'),\
    ('77','purdy.russ','4569af263554eadb723cf3aaf03958ad078d4d54','Abbie','Ratke','jillian21@example.com','65','0.99','0.51','-99.999','-29.592','Dolores aut tenetur maiores quo. Saepe hic accusamus quis velit quis ullam atque. Saepe sed minus eveniet deserunt.'),\
    ('78','fay.brannon','1f3be117bf5c5380341a516234b250a3cb0419f3','Katelin','Hane','wgutmann@example.net','91','0.47','0.65','99.999','-4.573','Qui nihil itaque aut nihil est veniam. Blanditiis et officiis saepe veritatis saepe. Culpa praesentium repellat aut omnis ea. Eos aliquid pariatur autem molestiae.'),\
    ('79','katarina29','d71f5fec2ed2781970ababeb0384f872cb9d5391','Lura','Douglas','ena46@example.com','50','0.65','0.79','-90.808','-19.480','Fuga iure et odit aut quisquam blanditiis iste. Repellat at aut est consequatur. Voluptatem commodi veniam voluptatem veritatis magni.'),\
    ('80','johnston.creola','5cb586ec1cd7be143d71aced61e6ffd25e4860f1','Fred','Reilly','eleanore.terry@example.net','66','0.15','0.80','-99.999','68.614','Repudiandae rerum quasi blanditiis consequuntur maxime nihil doloribus. Quis aut est libero vel. Corporis cumque beatae unde illo. Explicabo quo temporibus adipisci libero non.'),\
    ('81','jace.block','ea4b6c96202814914d9d829620a5b901b70920ca','Jovany','Weimann','smith.aiyana@example.org','97','0.36','0.39','37.829','-5.393','Quis sint qui animi. Officia iste iure assumenda quia. Quisquam quia debitis distinctio.'),\
    ('82','hpfeffer','b836c4bd9e81ca1f0f2814b7d5a0c451b6666807','Sean','Pollich','jgrimes@example.org','108','0.86','0.42','-99.999','-5.272','Est nulla officiis laborum asperiores dolorem. Vero dolores at ipsa qui alias deleniti. Nihil vel sit nemo distinctio non sunt quia quis. Qui id ducimus autem necessitatibus.'),\
    ('83','jany73','6e6cde6a9f512ae82c4bd721eaf3224dff6030af','Victor','Goldner','omari.streich@example.net','51','0.14','0.51','55.697','86.959','Officia tempore provident libero dignissimos. Non dolores est eius et. Labore aliquid atque et tempore. Inventore molestiae ut illum veniam ut assumenda doloremque.'),\
    ('84','ethelyn21','cd309b4925f3e4297f1a06b83f2c8999b84fdc43','Logan','Greenfelder','hjacobi@example.net','38','0.23','0.11','-99.999','-14.600','Maiores voluptatum consequatur aut occaecati laudantium. Officia non est molestiae possimus voluptates. Provident et reiciendis beatae nulla.'),\
    ('85','aoconner','39f0bf56c166d6e0859d1a3f7c8be77f5a1eb601','Maiya','Yundt','aleen.schimmel@example.org','69','0.77','0.91','99.999','42.017','Quia qui sit ipsam unde quia non excepturi. Qui et quibusdam non sapiente earum minus ducimus.'),\
    ('86','padberg.dayna','dfdd5aca2f7d3c097f1989c7c937b9cf6e73593b','Vallie','Pacocha','irma45@example.org','106','0.69','0.81','-54.104','-48.597','Numquam sint officiis ipsa dignissimos excepturi dignissimos. Aspernatur quod sed quia ratione laboriosam sint.'),\
    ('87','laury21','d96179853a83db346eb8704e562c7b4040055648','Gene','Conner','hleffler@example.com','97','0.71','0.33','50.472','56.064','Incidunt asperiores odit quae similique illo quia. Aut sed cumque minima quaerat. Quisquam ut nemo saepe aut deleniti cum.'),\
    ('88','laura63','044c21a437cda0657feeb9269c89e4a8f3d34ab2','Moshe','Mante','tanya.ferry@example.com','56','0.64','0.61','-99.999','35.787','Molestiae totam et ipsa. Nostrum sed rerum inventore facilis. Minima quam ratione aliquam quisquam quisquam autem.'),\
    ('89','arch.quitzon','2d4ac1debe91ce2e7d38c0f1b5037b190f566d85','Cara','Hahn','sammie44@example.com','113','0.06','0.48','99.999','18.426','Aliquam consectetur et aliquam. Fugit eos consequatur vero facere excepturi. At sint unde omnis et.'),\
    ('90','mweber','a53e15f378265bd3f3f8f7bddedf86f6e7b0ba2c','Lauriane','Brakus','huel.sarai@example.com','96','0.36','0.76','99.999','18.812','Beatae pariatur voluptatem tenetur dolorum. Consequuntur tenetur autem deleniti rerum dignissimos. Consequatur a ipsa quos earum eveniet sed mollitia tempora.'),\
    ('91','haskell.ondricka','ad9cd53705c677482b20867ca5aaf4172c159fb8','Sage','Turner','scasper@example.org','30','0.67','0.43','-79.225','19.834','Quod quo voluptatibus assumenda voluptas ipsum. Officiis est molestiae in animi provident nemo qui et. In omnis impedit quia praesentium expedita autem.'),\
    ('92','fpaucek','08de8247a23ca7fd0fe9785cba8419b2b2e5438c','Verla','Ward','delmer.zemlak@example.com','69','0.52','0.44','-99.999','-22.899','Magnam sint rerum et id enim molestias. Voluptatum impedit non quis et. A aperiam numquam excepturi pariatur repellendus aut.'),\
    ('93','gcasper','41792ccd3decc1c9fd5b134c1444fbf726c5abfe','Polly','Thiel','nestor99@example.org','37','0.36','0.94','36.090','-8.124','Et quo accusamus nobis id iure sapiente aut. Soluta occaecati vel dolorem. Non sit est et recusandae sunt atque.'),\
    ('94','willis.daniel','4791088557860afc135c9f16eb38730b29b2c90f','Hilma','Zieme','sofia54@example.com','57','0.52','0.03','-20.799','88.290','Laborum id qui dolorem nobis. Saepe aut omnis numquam. Excepturi est sed doloremque ratione consectetur nisi adipisci voluptatibus. Qui et porro architecto aliquam reiciendis consectetur veniam.'),\
    ('95','madalyn.kuhlman','eb433bb0849ed450de8945cfa7fedf95f91cee98','Nikki','Greenholt','jarret80@example.org','99','0.91','0.50','-33.157','-68.927','Dicta voluptatem ab similique recusandae quaerat dolores. Aut laborum ad eveniet minima in. Animi exercitationem provident voluptas.'),\
    ('96','corene25','6e062e2c45e8154ee02b00a711e0da85f6349516','Lenora','Leffler','lynch.lewis@example.org','110','0.79','0.77','81.268','20.470','Ut dolor laboriosam ipsum. Itaque odit consequatur ipsam. Quo iusto perspiciatis ea nihil facilis aspernatur mollitia.'),\
    ('97','iwhite','5efe34b6907381ae886a59b259690c2baee694b6','Maurine','Schneider','brooklyn.bauch@example.org','50','0.45','0.86','-99.999','-50.557','Sequi et natus enim reiciendis vel rem placeat. Tempora quam unde sit ad quibusdam porro corporis. Dolorum hic eum soluta in.'),\
    ('98','maybelle20','c6e1e086c43ed6c7e8b64df1098639674e8f7c57','Desmond','Roberts','prunte@example.org','47','0.17','0.68','68.970','19.290','Error quos est ratione neque placeat et. Dolorem inventore harum et mollitia accusamus iste. Nostrum beatae optio odit sit. Nostrum neque sunt dolorum.'),\
    ('99','estel.stanton','aa0f960048302f6171b719bb97a9051634966302','Evert','Jacobs','umckenzie@example.com','79','0.93','0.00','-99.999','-54.162','Dignissimos autem magnam culpa quidem aperiam. Accusamus eveniet vitae et saepe.\nEaque sit quibusdam assumenda sit enim. Possimus autem amet dolor. Optio qui expedita dolor ullam.'),\
    ('100','cristian.botsford','a3ccbf161c1a2c25062bfe38e4384bb746b644bd','Madie','Volkman','schiller.ivah@example.com','118','0.72','0.98','-99.999','39.319','Voluptatem fugiat vero officiis nihil. Et architecto atque facere reiciendis voluptate facilis quibusdam. Quia dolores sint occaecati dolores. Aut beatae autem temporibus iure dolore recusandae.')");
    
    connection.query('ALTER TABLE `users`\
    ADD COLUMN `bio` VARCHAR(255) AFTER password,\
    ADD COLUMN `fame` int(9) unsigned AFTER `pref`,\
    ADD COLUMN `online` int (2) AFTER `interests`');

    console.log('Creating Message table')

    console.log('Sucess!');
    console.log('Exiting...');
    connection.end();
})