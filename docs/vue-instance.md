# [The Vue instance](https://vuejs.org/v2/guide/instance.html)

- A Vue app has a *root* Vue instance with any number of *nested* Vue instances
- **A Vue component is itself a Vue instance**

## Data & methods (`data` and `methods` instance options properties)

- Properties in `data` are only reactive if they existed at the time of Vue instantiation!
- Vue instances expose a lot of special built-in properties and methods prefixed with `$`

## Instance lifecycle hooks

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`
