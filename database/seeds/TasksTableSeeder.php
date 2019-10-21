<?php

use Illuminate\Database\Seeder;
use App\Task;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = \Faker\Factory::create();
      for($i = 0; $i < 5; $i++) {
        Task::create([
          'name' => $faker->sentence,
          'info' => $faker->paragraph,
          'user_id' => 15,
          'project_id' => 38,
          'priority' => $i+1
        ]);
      }
    }
}
