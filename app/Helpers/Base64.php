<?php

namespace App\Helpers;

class Base64
{
    /**
     * Get type from base64 encoded image
     *
     * @param  string  $data
     * @return mixed
     */
    public static function getImageType(string $data)
    {
        $img = explode(',', $data);
        $ini = substr($img[0], 11);
        $type = explode(';', $ini);

        return $type[0];
    }

    /**
     * Check if image is png
     *
     * @param  string  $data
     * @return bool
     */
    public static function isPng(string $data)
    {
        return self::getImageType($data) == 'png';
    }

    /**
     * Check if image is jpg
     *
     * @param  string  $data
     * @return bool
     */
    public static function isJpg(string $data)
    {
        return self::getImageType($data) == 'jpg';
    }
}
