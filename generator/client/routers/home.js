genRoutes.route('/home', {
    name: 'generator.home',
    action: function (params, queryParams) {
        Layout.generator('generator_home');
    }
});
