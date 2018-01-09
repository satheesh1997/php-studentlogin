-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 30, 2017 at 06:49 AM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `androiddb`
--

-- --------------------------------------------------------

--
-- Table structure for table `academics`
--

CREATE TABLE `academics` (
  `id` int(100) NOT NULL,
  `s_id` varchar(15) NOT NULL,
  `sem_id` int(100) NOT NULL,
  `sub_1` float NOT NULL,
  `sub_2` float NOT NULL,
  `sub_3` float NOT NULL,
  `sub_4` float NOT NULL,
  `sub_5` float NOT NULL,
  `sub_6` float NOT NULL,
  `attendence` float NOT NULL,
  `cgpa` float NOT NULL,
  `sgpa` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `academics`
--

INSERT INTO `academics` (`id`, `s_id`, `sem_id`, `sub_1`, `sub_2`, `sub_3`, `sub_4`, `sub_5`, `sub_6`, `attendence`, `cgpa`, `sgpa`) VALUES
(1, '15TUIT054', 2, 90, 80, 90, 100, 95, 100, 95.3, 89.1, 89.1),
(2, '15TUIT054', 1, 90, 88, 89, 85, 92, 78, 89, 9.5, 9.2);

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `A` varchar(9) DEFAULT NULL,
  `B` varchar(28) DEFAULT NULL,
  `C` varchar(41) DEFAULT NULL,
  `D` varchar(6) DEFAULT NULL,
  `E` varchar(12) DEFAULT NULL,
  `F` varchar(13) DEFAULT NULL,
  `G` varchar(13) DEFAULT NULL,
  `H` varchar(12) DEFAULT NULL,
  `I` varchar(26) DEFAULT NULL,
  `J` varchar(123) DEFAULT NULL,
  `K` varchar(22) DEFAULT NULL,
  `L` varchar(23) DEFAULT NULL,
  `M` varchar(50) DEFAULT NULL,
  `N` varchar(17) DEFAULT NULL,
  `O` varchar(28) DEFAULT NULL,
  `UID` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `details`
--

INSERT INTO `details` (`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `UID`) VALUES
('15TUIT054', 'Minu Preethi E.', 'Information Technology', 'Female', '09.07.1997', 'B +ve', 'Hindu', 'BC', 'Eswaran N.H.', '1/190, Naduhatty Village, Kattabettu Post, Kotagiri, The Nilgiris - 643214', '9489581830', '7373082573', 'mn.preethi@gmail.com', 'DOTE', 'Hostel', 2717);

-- --------------------------------------------------------

--
-- Table structure for table `passwords`
--

CREATE TABLE `passwords` (
  `pid` int(11) NOT NULL,
  `uid` varchar(9) NOT NULL,
  `password` text NOT NULL,
  `last_changed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `passwords`
--

INSERT INTO `passwords` (`pid`, `uid`, `password`, `last_changed`) VALUES
(1, '15TUIT054', 'skctcse@', '2017-05-30 01:19:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academics`
--
ALTER TABLE `academics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `s_id` (`s_id`,`sem_id`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `uid` (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academics`
--
ALTER TABLE `academics`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `details`
--
ALTER TABLE `details`
  MODIFY `UID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2974;
--
-- AUTO_INCREMENT for table `passwords`
--
ALTER TABLE `passwords`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
