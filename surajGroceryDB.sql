-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 31, 2020 at 01:19 AM
-- Server version: 5.6.47-cll-lve
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surajGroceryDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(200) NOT NULL,
  `token` varchar(300) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `firstName`, `lastName`, `username`, `password`, `image`, `token`, `status`) VALUES
(1, 'suraj', 'kumar', 'admin', 'admin', 'default_user.jpg', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `product_ids` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(5) NOT NULL,
  `date` varchar(200) NOT NULL,
  `order_ref_code` varchar(500) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `address_id`, `quantity`, `unit`, `date`, `order_ref_code`, `status`) VALUES
(1, 1, 1, 5, 4, 'kg', '2020-05-30T23:06:01.969Z', '123', 0),
(2, 1, 3, 5, 4, 'kg', '2020-05-30T23:06:01.969Z', '123', 0),
(3, 1, 5, 5, 3, 'kg', '2020-05-30T23:06:01.969Z', '123', 0),
(4, 1, 2, 5, 3, 'kg', '2020-05-30T23:06:01.969Z', '123', 0),
(5, 1, 4, 7, 2, 'kg', '2020-05-30T23:07:13.772Z', '123', 0),
(6, 1, 8, 7, 4, 'kg', '2020-05-30T23:07:13.772Z', '123', 0),
(7, 1, 9, 7, 2, 'kg', '2020-05-30T23:07:13.772Z', '123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `mrp` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `unit` varchar(6) NOT NULL,
  `date` varchar(200) NOT NULL,
  `image` varchar(500) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `mrp`, `price`, `stock`, `unit`, `date`, `image`, `status`) VALUES
(1, 'Apple', 'fruits', 80, 60, 10, 'kg', '2020-03-30T18:45:16.855Z', 'apple.jpg', '0'),
(2, 'Brinjal', 'vegetables', 35, 25, 30, 'kg', '2020-04-25T20:28:13.978Z', 'brinjal.jpg', '0'),
(3, 'Guava', 'fruits', 50, 30, 20, 'kg', '2020-03-30T18:51:05.367Z', 'guava.jpg', '0'),
(4, 'Rice', 'cereals', 100, 80, 50, 'kg', '2020-03-05T19:36:28.061Z', 'rice.jpg', '0'),
(5, 'Papaya', 'fruits', 90, 70, 20, 'kg', '2020-03-30T18:12:54.135Z', 'a-papaya-cut-in-half.jpg', '0'),
(6, 'potato', 'vegetables', 20, 18, 50, 'kg', '2020-05-03T02:40:11.233Z', 'download.jpg', '0'),
(7, 'lady finger', 'vegetables', 160, 150, 30, 'kg', '2020-03-30T18:38:36.340Z', 'lady_finger.jpg', '0'),
(8, 'Wheat', 'cereals', 30, 18, 50, 'kg', '2020-04-25T20:27:10.050Z', 'wheat.jpg', '0'),
(9, 'bajra', 'cereals', 50, 48, 60, 'kg', '2020-03-19T19:38:01.589Z', 'bajra.jpg', '0'),
(10, 'onion', 'vegetables', 40, 38, 20, 'kg', '2020-03-19T20:06:18.192Z', 'onion.jpg', '0'),
(11, 'Babaji Oil', 'oil', 100, 90, 50, 'kg', '2020-03-30T18:53:06.794Z', 'babaji.jpg', '0'),
(12, 'Babaji Oil', 'oil', 100, 90, 50, 'kg', '2020-03-30T19:01:37.065Z', 'babaji.jpg', '0'),
(13, 'Cucumber ', 'vegetables', 20, 15, 5, 'kg', '2020-04-27T07:26:31.796Z', '71xki-pie5l.jpg', '0'),
(14, 'Grapes', 'fruits', 90, 80, 15, 'kg', '2020-05-03T02:27:19.151Z', 'images.jpg', '0'),
(15, 'Jackfruit', 'vegetables', 40, 35, 50, 'kg', '2020-05-19T05:44:52.917Z', 'jackfruit_200316090551.jpg', '0'),
(16, 'watermelon', 'fruits', 40, 30, 50, 'kg', '2020-05-29T15:13:24.136Z', 'water-malon.jpg', '0'),
(17, 'orange', 'fruits', 60, 45, 50, 'kg', '2020-05-21T05:11:20.459Z', 'orange-fruit-161559.jpg', '0'),
(18, 'coriender', 'vegetables', 15, 10, 50, 'kg', '2020-05-21T05:15:54.319Z', 'adobestock_2429251_preview_(1).jpeg', '0'),
(19, 'green pea', 'vegetables', 40, 35, 50, 'kg', '2020-05-21T05:16:28.180Z', 'hqdefault_(1).jpg', '0');

-- --------------------------------------------------------

--
-- Table structure for table `products_availability`
--

CREATE TABLE `products_availability` (
  `countries` longtext NOT NULL,
  `states` longtext NOT NULL,
  `cities` longtext NOT NULL,
  `picodes` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `body` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id`, `product_id`, `body`) VALUES
(1, 1, '{\"time\":\"1585593841128\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Rich source of iron\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"I love Apple.\"}},{\"type\":\"header\",\"data\":{\"text\":\"Eat apple a day, Keep the doctor away.\",\"level\":\"2\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"Everyone should eat apple.\"}}],\"version\":\"2.16.1\"}'),
(2, 2, '{\"time\":\"1584646552800\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of carbohydrate\"}}],\"version\":\"2.16.1\"}'),
(3, 3, '{\"time\":\"1585593940441\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of bitamins.\"}}],\"version\":\"2.16.1\"}'),
(4, 4, '{\"time\":1583437078005,\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Rice is a rich source of Carbohydrade.\"}}],\"version\":\"2.16.1\"}'),
(5, 5, '{\"time\":1585592053985,\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of Sulfer.\"}}],\"version\":\"2.16.1\"}'),
(6, 6, '{\"time\":\"1584646552800\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of carbohydrate\"}}],\"version\":\"2.16.1\"}'),
(7, 7, '{\"time\":\"1585593527162\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of fiber.\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"I love ladyfinger.\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"You should eat ladyfinger.\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"Hello world.\"}}],\"version\":\"2.16.1\"}'),
(8, 8, '{\"time\":\"1585590486263\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Wheat is a source of carbohydrate\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"HEllo\"}}],\"version\":\"2.16.1\"}'),
(9, 9, '{\"time\":1584646773972,\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Bajra is rich source of fiber.\"}}],\"version\":\"2.16.1\"}'),
(10, 10, '{\"time\":1584648433159,\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Onion is rich source of antioxidece.\"}}],\"version\":\"2.16.1\"}'),
(11, 12, '{\"time\":\"1585594926658\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"A good quality crude oil\"}},{\"type\":\"header\",\"data\":{\"text\":\"Oil should be good before use.\",\"level\":\"2\"}}],\"version\":\"2.16.1\"}'),
(12, 13, '{\"time\":\"1587971978646\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"<b>cucumbers<\\/b>&nbsp;are low in calories and contain a&nbsp;<b>good<\\/b>&nbsp;amount of water and soluble fiber, making them ideal for promoting hydration and aiding in weight loss.\"}}],\"version\":\"2.17.0\"}'),
(13, 14, '{\"time\":\"1588472795089\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Grapes contain such minerals as&nbsp;<a href=\\\"https:\\/\\/www.britannica.com\\/science\\/calcium\\\">calcium<\\/a>&nbsp;and&nbsp;<a href=\\\"https:\\/\\/www.britannica.com\\/science\\/phosphorus-chemical-element\\\">phosphorus<\\/a>&nbsp;and are a source of&nbsp;<a href=\\\"https:\\/\\/www.britannica.com\\/science\\/vitamin-A\\\">vitamin A<\\/a>.\"}}],\"version\":\"2.17.0\"}'),
(14, 15, '{\"time\":\"1588474178040\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\",&nbsp;<b>jackfruit<\\/b>&nbsp;supplies plenty of nutritional&nbsp;<b>perks<\\/b>: It\'s low in calories, naturally fat- and sodium-free, provides ample vitamin A (in the form of beta-carotene) and vitamin C, and packs in a surprising blood pressure-lowering potassium.\"}}],\"version\":\"2.17.0\"}'),
(15, 16, '{\"time\":\"1590765369370\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"As with other citrus\\nfruits, watermelon pulp is an excellent source of&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Vitamin_C\\\">vitamin C<\\/a>, providing 64% of the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Daily_Value\\\">Daily Value<\\/a>&nbsp;in a 100&nbsp;g serving (right table). Numerous other&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Essential_nutrients\\\">essential nutrients<\\/a>&nbsp;are present in low amounts.\"}},{\"type\":\"paragraph\",\"data\":{\"text\":\"Watermelons are large and round to oval in shape. Their skin is thick, smooth, and dark green with green-black striping. The flesh is deep red, juicy, and tender with a few round black seeds.They are crisp and juicy with a very sweet flavour. 1 Piece weighs around 1000 to 1500 Grams\"}}],\"version\":\"2.17.0\"}'),
(16, 17, '{\"time\":\"1589949717787\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"&nbsp; As with other citrus fruits, orange pulp is an excellent source of&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Vitamin_C\\\">vitamin C<\\/a>, providing 64% of the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Daily_Value\\\">Daily Value<\\/a>&nbsp;in a 100&nbsp;g serving (right table). Numerous other&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Essential_nutrients\\\">essential nutrients<\\/a>&nbsp;are present in low amounts&nbsp;&nbsp;\"}}],\"version\":\"2.17.0\"}'),
(17, 18, '{\"time\":\"1590037959940\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"&nbsp;CORINDER pulp is an excellent source of&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Vitamin_C\\\">vitamin C<\\/a>, providing 64% of the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Daily_Value\\\">Daily Value<\\/a>&nbsp;in a 100&nbsp;g serving (right table). Numerous other&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Essential_nutrients\\\">essential nutrients<\\/a>&nbsp;are present in low amounts&nbsp;&nbsp;\"}}],\"version\":\"2.17.0\"}'),
(18, 19, '{\"time\":\"1590038321613\",\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"&nbsp; The&nbsp;<b>pea<\\/b>&nbsp;is most commonly the small spherical&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Seed\\\">seed<\\/a>&nbsp;or the seed-pod of the pod&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Fruit\\\">fruit<\\/a><i><b>Pisum sativum<\\/b><\\/i>. Each pod contains several peas, which can be green or yellow. Botanically, pea pods are&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Fruit\\\">fruit<\\/a>,<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Pea#cite_note-2\\\">[2]<\\/a>&nbsp;since they contain seeds and develop from the ovary of a (pea) flower. The name is also used to describe other edible seeds from the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Fabaceae\\\">Fabaceae<\\/a>&nbsp;such as the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Pigeon_pea\\\">pigeon pea<\\/a>&nbsp;(<i>Cajanus cajan<\\/i>), the&nbsp;<a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Cowpea\\\">cowpea<\\/a>&nbsp;(<i>Vigna unguiculata<\\/i>), and the seeds from several species of&nbsp;<i><a href=\\\"https:\\/\\/en.wikipedia.org\\/wiki\\/Lathyrus\\\">Lathyrus<\\/a><\\/i>.&nbsp;&nbsp;\"}}],\"version\":\"2.17.0\"}');

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `person_name` varchar(100) NOT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pincode` int(6) NOT NULL,
  `address` varchar(500) NOT NULL,
  `landmark` varchar(100) NOT NULL,
  `defaultAddress` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`id`, `user_id`, `person_name`, `country`, `state`, `city`, `pincode`, `address`, `landmark`, `defaultAddress`) VALUES
(5, 1, 'gautam', 'india', 'bihar', 'bhagalpur', 110019, 'rz-54/f', 'madhyamarg', 1),
(7, 1, 'rakhi', 'india', 'bihar', 'bhagalpur', 110019, 'mohanpur', 'school', 0),
(11, 12, 'gaurav', 'india', 'bihar', 'bhagalpur', 110021, 'jha tola', 'bajrangbali stan', 1),
(9, 1, 'gautam2', 'india', 'bihar', 'bhagalpur', 110019, 'tughlakabad', 'gali no 6', 0),
(10, 1, 'mukesh', 'india', 'bihar', 'bhagalpur', 110020, 'bihpur', 'main road', 0),
(12, 9, 'hfcouc', 'india', 'bihar', 'bhagalpur', 110020, 'wyositsota', 'lhsogaota', 0),
(13, 4, 'suraj', 'india', 'bihar', 'bhagalpur', 110019, 'jha tola', 'bjrang', 0),
(14, 6, 'madhav kumar ', 'india', 'bihar', 'bhagalpur', 110019, 'bhagalpur ', 'bhagalpur ', 1),
(15, 1, 'shyam sundar kumar', 'india', 'bihar', 'bhagalpur', 110019, 'telghi', 'bhajrangbali', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `middleName` varchar(50) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(500) NOT NULL,
  `code` varchar(500) NOT NULL,
  `date` varchar(200) NOT NULL,
  `updateDate` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `middleName`, `lastName`, `mobile`, `email`, `username`, `password`, `image`, `code`, `date`, `updateDate`, `status`) VALUES
(1, 'Gautam', '', 'Kumar', '9953210510', 'gautam.4537@gmail.com', '9953210510', 'Kingbadshah@12', 'default.png', '40f38bb00dd32f2f4a7c9e2f49376385', '2020-04-27T21:07:32.296Z', '2020-04-27T21:07:32.296Z', 1),
(2, 'Shyam', 'Sundar', 'Kumar', '8298351071', 'Sundar7631@gmail.com', '8298351071', 'Gk8298@gk', 'default.png', 'a129272fb9ca5fcc1cd5e2e0243412ac', '2020-04-28T06:30:08.859Z', '2020-04-28T06:30:08.859Z', 0),
(3, 'Suraj', '', 'Kumar ', '8407056942', '', '8407056942', 'Suraj@123', 'default.png', 'd351fb5354e31b3c2d40aae4cd97548c', '2020-04-28T07:28:27.748Z', '2020-04-28T07:28:27.748Z', 1),
(4, 'Nitin', '', 'Raj', '9955100393', '', '9955100393', 'Ajit@123', 'IMG20200319130736.jpg', '51eda8790bf1b295d6a68f5847165d78', '2020-04-28T12:50:07.488Z', '2020-04-29T05:32:23.071Z', 1),
(5, 'Radhe', '7091107066', 'Thakur', '7091107066', '', '7091107066', 'Radhe@123', 'IMG_20200429_073604.jpg', '22f192a1062bbd48fa8b400024974c9f', '2020-04-29T12:51:56.971Z', '2020-04-29T12:51:56.971Z', 0),
(6, 'Madhav ', '', 'Kumar', '7021774967', 'Mahakaldeva02359@gmail.com', '7021774967', 'Mahakal@123', 'default.png', 'cd7242dd80b07e5bc3b88f03746ab0c3', '2020-05-05T10:52:05.281Z', '2020-05-05T10:52:05.281Z', 1),
(7, 'Nitin', '', 'Kumar', '7383943510', '', '7383943510', 'Nitin@123', 'default.png', '75cd8bdb29ab8b7425513f4d9f921661', '2020-05-07T01:42:59.315Z', '2020-05-07T01:42:59.315Z', 0),
(8, 'shyam', '', 'kumar', '7282999547', '', '7282999547', 'Suraj@123', 'default.png', 'ef81e1baafc52618384e4723286b12f5', '2020-05-21T05:39:56.147Z', '2020-05-21T05:39:56.147Z', 0),
(9, 'Sushant', '', 'Kumar', '7739919993', '', '7739919993', 'Sushant@123', 'default.png', 'c8915ef5b6dfd33bed01c3a00c0da1d6', '2020-05-22T06:25:41.730Z', '2020-05-22T06:25:41.730Z', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
