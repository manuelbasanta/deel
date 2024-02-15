1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

If the props and state of a PureComponent don't change when it's parent rerender this PureComponent won't re-render. On the other hand this case does trigger a re-render in the case of a component.
Since the comparison of state and props is shallow this might lead to false positives in the case of complex objects.
This is legacy stuff that not only me but most people do not use and react does not recommend.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

I guess that all descendants of the context provider will be updated regardless of the ShouldComponentUpdate method so it becomes unreliable. 
Again, I do not use ShouldComponentUpdate at all.

3. Describe 3 ways to pass information from a component to its PARENT.

The parent could pass a function as a prop for the child to handle whatever event is needed to updated certain information, upon that update the child will execute the function and pass the new information to the parent

By information I understand any type of data that could be useful for the parent regarding the child son using react's forwardRef is also an option. With forwardRef the child can expose a DOM node to the parent and the parent can this way modify the node, execute functions inside the child component, etc.

Using some sort of context provider would also work, the child could update the state of the context and the parent would receive the update. In a  similar manner the use of state management tools like Redux would also allow the child to make updates to a global state that the parent would have access to.


4. Give 2 ways to prevent components from re-rendering.

The already discussed shouldComponentUpdate method can prevent re-renders when the props passed to the component do not change.

The useMemo hook can chache the result of a function and use the cached result if params are not changed. useCallback wokrs in a similar way but it stores the function definition.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

Fragment provides a way to wrap components without introducing new dom elements. It can be useful to wrap elements that do not need extra dom containers but the wrapping is required since they should have a single parent.

6. Give 3 examples of the HOC pattern.

HOC is a function that takes a component and returns a new component that modifies the param component somehow.

Some examples are:

Styling components a certain way
A wrapper for making requests prior to the render of the component, an skeleton can be shown if the request is pending.
Adding a tooltip to a compoent when the user clicks

There are many more examples.


7. What's the difference in handling exceptions in promises, callbacks
and async...await?

For async and await I try/catch is needed to handle errors like so:

```
try {
    const res = await request()
} catch(err) {
    console.log(err)
}
```

For a promise, let's say created like

```
const promise = new Promise((resolve, reject) => ...)
```

a callback can be registered to handle errors:

```
promise.then(function(result) {
 console.log(result);
}).catch(function(error) {
 console.log(error);
});
```

A common scenario when working with apis is as follows:

```
fetch(url)
    .then()
    .catch(err => console.log(err))
```


8. How many arguments does setState take and why is it async.
Haven't used it in a while, setState can take an object as the first argument that updates the state and a callback as updater of the state as a second one. The call to setState doesn't immediately update the component, for performance reasons it may batch updates.


9. List the steps needed to migrate a Class to Function Component.

First and foremost the class definition should be turn into a function definiction.
The methods of the class should be turned into functions declared inside the function component.
The constructor has to be removed, any state inside the func component can be handled using a useState hook.
Lifecicle methods have to be removed, the useEffect hook is then used to replace those.
Replace the render method with the return statement at the end of the component.


10. List a few ways styles can be used with components.
Styles can be:

Imported from css/sass stylesheets, using classes the declarations on the stylesheet will impact on the view.
Styled components use template literals to modify the styling of components directly on the component file.
Inline styling, passing the style attribute to any element.
Modules that generate styles locally for each file, avoiding style clashes with common class names for example

11. How to render an HTML string coming from the server.

You can pass a raw HTML string into an element using dangerouslySetInnerHTML.
```
<div dangerouslySetInnerHTML={{ __html: '<div>html</div>' }} />
```