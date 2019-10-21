-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2019 at 12:14 AM
-- Server version: 10.4.7-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_09_12_153013_adds_api_token_to_users_table', 2),
(6, '2019_10_17_124828_create_projects_table', 1),
(7, '2019_10_18_190508_create_tasks_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `user_id`, `name`, `info`, `created_at`, `updated_at`) VALUES
(28, 15, 'Harum minus eaque culpa quia.', 'Omnis consequatur et laboriosam corporis vitae dolor et. Est tenetur est adipisci vel ullam molestiae. Harum cum vitae quo aut harum quaerat suscipit. A quia sint omnis quia perspiciatis hic eum.', '2019-10-18 14:32:14', '2019-10-20 22:35:40'),
(34, 15, 'Voluptas minus magni et quae ipsa.', 'Quam iste dignissimos voluptas quia. Voluptas et rerum quis sit odit. Eaque suscipit distinctio modi sed.', '2019-10-18 14:32:15', '2019-10-18 14:32:15'),
(37, 15, 'Eligendi est veniam nesciunt eos occaecati.', 'Quis architecto voluptatibus provident facilis voluptatum reiciendis sit. Praesentium ut voluptatem quia laboriosam id. Aperiam nihil odit et.', '2019-10-18 14:32:16', '2019-10-18 14:32:16'),
(38, 15, 'Delectus quis animi itaque modi aut sit quas.', 'Officia inventore eum autem eligendi consectetur sint. Exercitationem at voluptas voluptates eos. Beatae molestiae libero molestias rerum quisquam.', '2019-10-18 14:32:16', '2019-10-18 14:32:16'),
(39, 15, 'Commodi culpa suscipit optio nemo sapiente ex.', 'Voluptatem magnam assumenda omnis doloribus porro molestiae. Nostrum ullam corporis quas eos dolor ea doloremque. Occaecati autem est ea provident facere omnis porro. Cum magni totam molestiae maxime voluptatem.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(40, 15, 'Incidunt veritatis officiis omnis autem magnam fugiat voluptatum.', 'Harum est pariatur natus et labore veniam assumenda. Minima placeat deserunt voluptas accusamus inventore. Vel nihil reiciendis ut officia vitae.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(41, 15, 'Ea eveniet maiores impedit ullam exercitationem quaerat.', 'Molestiae qui assumenda similique maiores ipsum. Velit quis nihil ad quis ex maiores molestiae. Ut aut dolorem et nam. Officia nihil voluptatem distinctio explicabo nostrum tenetur consequatur.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(42, 15, 'Illum dolores quidem delectus nulla.', 'Non et eos vero consequatur consequatur fuga nostrum qui. Eos voluptas sit sunt voluptatem. Commodi harum quis recusandae doloremque. Nam voluptate porro voluptatibus aut.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(43, 15, 'Aliquam consequatur voluptatum tempore voluptatibus quae.', 'Ut soluta et perspiciatis voluptate. Amet laboriosam quia sit. Deleniti molestiae quam doloremque aut excepturi. In vel nihil nihil voluptatum cumque voluptatibus. Rerum voluptatem quasi voluptatem.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(44, 15, 'Quaerat cupiditate voluptas aut ducimus.', 'Possimus tempora placeat praesentium. Et facilis quod ea quidem et. Minima ea cumque rerum fuga ut.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(45, 15, 'Quia expedita ut enim sint expedita.', 'Id ut provident laboriosam vel ut. Aliquid officiis expedita omnis labore harum itaque labore. Voluptate sunt qui fugit qui nihil dolore nostrum.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(46, 15, 'Labore fugit dolorem magni consequatur.', 'Eveniet expedita delectus natus et beatae id beatae. Voluptas ipsum quo tenetur ullam dolor numquam. In commodi dolorem aspernatur. Ut sit est reprehenderit dolorem sint. Ipsum reprehenderit harum nemo.', '2019-10-18 14:32:17', '2019-10-18 14:32:17'),
(47, 15, 'Ut officia quia dicta veritatis magni.', 'Dolor nihil aperiam ut. Vel voluptas nostrum sapiente aliquam ipsum recusandae. Eius quo sunt autem ipsum et accusamus doloribus omnis.', '2019-10-18 14:32:18', '2019-10-18 14:32:18'),
(48, 2, 'Project Cod3r', 'This is the first project by cod3r', '2019-10-18 21:57:21', '2019-10-18 21:57:21'),
(49, 15, 'Project X', 'Project to alleviate poverty in the world.', '2019-10-20 16:15:46', '2019-10-20 16:15:46'),
(50, 15, 'Project Kalakuta', 'Deep rooted in Africa and culture.', '2019-10-20 16:17:59', '2019-10-20 16:17:59');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `project_id`, `name`, `info`, `priority`, `created_at`, `updated_at`) VALUES
(1, 15, 38, 'Illo ut praesentium quis repellat.', 'Eum vel rerum quaerat omnis nobis ea totam. Non fugiat ut quis libero architecto illo fugit. Nobis minus nihil et cupiditate. Vel voluptas minus omnis qui nobis neque eligendi.', 1, '2019-10-19 08:20:51', '2019-10-20 15:52:31'),
(2, 15, 38, 'Sed similique minima excepturi voluptate.', 'Vel rem illo quisquam eligendi omnis facere. Quis possimus cupiditate impedit sed sed et. Eius sit sint eum est ea ut. Quidem voluptatem quas ipsa perferendis.', 4, '2019-10-19 08:20:52', '2019-10-20 15:20:44'),
(3, 15, 38, 'Rerum quaerat molestias doloremque ut dolores voluptas consequatur.', 'Possimus vel eius ipsum quia optio ut suscipit. Autem esse eaque dolor magnam dolorem. Eum aspernatur ipsam officiis minima in sunt.', 3, '2019-10-19 08:20:52', '2019-10-20 15:22:52'),
(4, 15, 38, 'Consequatur inventore quia dolorum pariatur qui tenetur blanditiis.', 'Amet voluptatibus amet quo sed et eveniet. Et ab vel quaerat odit expedita dolorum ut. Maxime voluptatem dolore delectus aspernatur voluptatem at laboriosam sunt. Voluptas sint et reiciendis est aliquam consequatur.', 2, '2019-10-19 08:20:52', '2019-10-20 15:22:20'),
(5, 15, 38, 'Soluta ea rerum sapiente voluptates in omnis excepturi.', 'Ipsa consectetur nulla impedit repudiandae provident quasi. Voluptas minima sint occaecati delectus id. Repellat repellendus quia fugit.', 5, '2019-10-19 08:20:52', '2019-10-20 15:23:09'),
(6, 15, 50, 'Task 1', 'Task 1 of 1', 1, '2019-10-20 17:58:40', '2019-10-20 17:58:40'),
(7, 15, 50, 'Task 2', 'Task 2 of 2', 2, '2019-10-20 18:04:01', '2019-10-20 18:04:12'),
(9, 15, 28, 'Task 1', 'Task 1 of many.', 1, '2019-10-20 21:10:54', '2019-10-20 21:10:54'),
(10, 15, 28, 'Task 2', 'Task 2 of many', 2, '2019-10-20 22:35:40', '2019-10-20 22:35:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `api_token` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `api_token`) VALUES
(2, NULL, 'cod3r', NULL, NULL, '$2y$10$gKvuYStZ7xX1o7nNA/LNMuk8R950HDuwiWjYxcw1UJnGMEvhmGaqu', NULL, '2019-09-13 07:41:47', '2019-10-18 19:53:51', 'fxOgZtQZeEcsz6Bpc1pEdBCvQrXoyJDjAEJFTcjEL7FvTn2EtHMd2lImH3vg'),
(3, NULL, 'bolatito', NULL, NULL, '$2y$10$vROyJbuOByxMcighEnGNg.vM903ZBlYBPT6c0LxG3iAjmwGAw/2LG', NULL, '2019-09-13 08:11:26', '2019-09-13 08:11:26', 'LMSDl1nLdticsWayNDWvxMBd2agSQcKIGTWH2mIIluMoRntmfvBXYSnk2Eyd'),
(4, NULL, 'tunde', NULL, NULL, '$2y$10$/rHp0WnxIRVlkiOvwOioX.Nvr9qn2t0D0.0YYvsayOxltT0ZnGNwm', NULL, '2019-09-13 09:48:48', '2019-09-13 09:48:48', 'Pu2otwkfXoAwO3lGK0FRHhOjGvTKSZ0IX6Xmiri5h1e5dem6Gaq0MT4tZuYn'),
(5, NULL, 'tayelolu', NULL, NULL, '$2y$10$mLiS/rjgXtuzH5JWarqLDehUQSnZ125NTjl3w/nXuxYP2bwhHsLBm', NULL, '2019-09-14 19:48:50', '2019-09-14 19:48:51', 'wzDqC6hwThcnpcAE5eToKpu0tYTAfVQyjk6ZbRe5jVR1q3OSDgNPu5ozlBQf'),
(6, NULL, 'ogundairo', NULL, NULL, '$2y$10$QiQX4F.CCt1aCRKrX.D34.7eDyYisRECSoIfyY6qh4N5W8sEHAzLK', NULL, '2019-09-14 19:52:17', '2019-09-14 19:52:18', 'ek10HyF2wLxY0AcK0MBOr1bfdwVZY3w18158wINLqnSKKxvqdahdMr5wRpFr'),
(7, NULL, 'ogundana', NULL, NULL, '$2y$10$hodwBCxU8glgt5CjcxIX/O7E8q3507MdbyMsPh5SMScDtDZnUmvbC', NULL, '2019-09-14 21:13:54', '2019-09-14 21:13:54', '77wpseR2wsYzoaJtWMgjgUc5EY2VWjH7Y00En8c4saDmPjWNiCaikrfqr0PZ'),
(8, NULL, 'olamide', NULL, NULL, '$2y$10$wHHTV5Lsd/1SSWa1yNZONekbMNsjfSa/DtKdxWco2KoipKInb1HTO', NULL, '2019-09-15 01:07:33', '2019-09-15 01:07:33', 'Mtm1jfIF6sy3vLkj2QMvs7WDxhlveuiPwQAMOPrE4ejGANVxSHcNAKwkKp7t'),
(9, NULL, 'olanre', NULL, NULL, '$2y$10$qWNzOyUtaOzFMSLlALGKPu9g2wC.JkrW6VixP3t.zywm.NvKS7Tv6', NULL, '2019-09-15 01:09:34', '2019-09-15 01:09:34', 'bxQ1xsnoqgjgoiRNL5hbzExMXN3L1Rq0zv0mpwCrVuzAQDnjvObT7re1iLuB'),
(10, NULL, 'kunle', NULL, NULL, '$2y$10$piE6aa7Pb7hYFscX2foZG.QxgMFr94.a8rNeIQ.VRJUGo0hzHL96C', NULL, '2019-09-15 01:11:49', '2019-09-15 01:11:49', '9ikrauWkptidnpu6L5Un232BfXlRFIEPDLcUTs9HiMfkp2XMfPO7HljwZJWk'),
(11, NULL, 'lola', NULL, NULL, '$2y$10$GpgtAhtPCU8TB.Kvahp2buK187ND7V67mzJSx1jerk2YsDSZYyGM6', NULL, '2019-09-15 01:12:59', '2019-09-15 01:12:59', 'LkR4UwtcMoTECbd0Fy9X5OB4oVzeEFZcwwTRM6mw63xEPfWSqS6KN65KPFoC'),
(12, NULL, 'kunleo', NULL, NULL, '$2y$10$8uZFo8GoNphLd0ZJVQs7je2Ud/N19sClbLJsmCstY6GqRWN5IuEWm', NULL, '2019-09-15 08:59:59', '2019-09-15 09:00:00', 'wEnyDjJ4InNTCCQOMC9i6gmhSD2UXASnx8zgIjq8wqHTBZpa1k3nOMg57cjD'),
(13, NULL, 'lamidi', NULL, NULL, '$2y$10$ufC475mphA/CxRweQghVeOvT2zfhDS9RvLUzE2D4n0suSQHOkgCy2', NULL, '2019-09-15 09:31:02', '2019-09-15 09:31:02', 'N66Ari5ubuNYWQyOiweyJqpX9Y0Y4VaxgpczvyDYfg87PWIEJGds1TS6orzW'),
(14, NULL, 'lamidi22', NULL, NULL, '$2y$10$7LOEYZ4tgtJ.P.pd0RPmYO3bHoDlPCyt1ErJapTF0u.vF.hCha42C', NULL, '2019-09-15 09:35:35', '2019-09-15 09:35:35', 'me90oOFcD0mCz8nEJcWlRw4JOBogm9Lqj8uJPTHRbzruXToz9RCj8dZjEXGI'),
(15, NULL, 'yinka', NULL, NULL, '$2y$10$pOlHpZfezKvve/bGgxfZZu8qCLp.C2oB936cWm7Vgm3pMu8KyMFFO', NULL, '2019-10-17 09:58:30', '2019-10-20 22:48:54', 'oKNJSOI7dfGWTnXVSrbNYEktBkjZweMwruKBjSGcaeaclZ0KUpyUqD9J9umm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_user_id_foreign` (`user_id`),
  ADD KEY `tasks_project_id_foreign` (`project_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_api_token_unique` (`api_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `tasks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
