
# dependency resolution algorithm

## list

```
a1 -> l1 
a1 -> l2
a1 -> l3
a2 -> l1
l1 -> l2
l3 -> l2
l3 -> l4
```

## graph

### app `a1` reviewed

```
      a1
    / |  \
  l1  l2  l3
```

### app `a2` reviewed

```
a2     a1
 \   / |  \
   l1  l2  l3
```


### lib `l1` reviewed

```
a2     a1
 \   / |  \
   l1  |  |
     \ |  |
      l2  l3
```


### lib `l2`reviewed

```
a2     a1
 \   / |  \
   l1  |  |
     \ |  |
      l2  l3
```

### lib `l3` reviewed

```
a2     a1
 \   / |  \
   l1  |  |
   |   |  |
    \  |  l3
     \ | / \
       l2  l4
```

### lib `l4` reviewed

```
a2     a1
 \   / |  \
   l1  |  |
   |   |  |
    \  |  l3
     \ | / \
       l2  l4
```