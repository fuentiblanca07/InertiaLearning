<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['desc' => 'Superadmin', 'created_at' => NOW(), 'updated_at' => NOW()],
            ['desc' => 'Client', 'created_at' => NOW(), 'updated_at' => NOW()],
        ];

        DB::table('user_types')->insert($data);
    }
}