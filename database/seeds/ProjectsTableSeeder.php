<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $faker = \Faker\Factory::create();
       for ($i = 0; $i < 20; $i++) {
         Project::create([
            'name' => $faker->sentence,
            'info' => $faker->paragraph,
            'user_id' => 15
         ]);
       }
    }
}
