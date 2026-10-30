<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admins = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@frajosantech.co.ke',
                'password' => 'Admin@Frajosan2025!',
                'role' => 'admin',
                'is_active' => true,
            ],
            [
                'name' => 'Editor',
                'email' => 'editor@frajosantech.co.ke',
                'password' => 'Editor@Frajosan2025!',
                'role' => 'editor',
                'is_active' => true,
            ],
        ];

        foreach ($admins as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make($data['password']),
                    'role' => $data['role'],
                    'is_active' => $data['is_active'],
                ]
            );
        }
    }
}