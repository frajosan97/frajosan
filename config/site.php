<?php

return [
    'contact_recipients' => array_filter(explode(',', env(
        'CONTACT_RECIPIENTS',
        'info@frajosantech.co.ke'
    ))),
];