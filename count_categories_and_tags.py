#!/usr/bin/env python3
"""Print counts for categories and tags."""

from collections import defaultdict
import os
import yaml


def extract_yaml_front_matter(filepath):
    """Extract YAML front matter from a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    if not lines or lines[0].strip() != "---":
        return None
    yaml_str = ""
    for line in lines[1:]:
        if line.strip() == "---":
            break
        yaml_str += line
    return yaml.safe_load(yaml_str)


def main():
    """Run the main method."""
    icons_dir = 'docs/content/icons'
    if not os.path.isdir(icons_dir):
        print(f'Directory "{icons_dir}" not found.')
        return

    category_files = defaultdict(list)  # category -> [filenames]
    tag_files = defaultdict(list)       # tag -> [filenames]

    for filename in os.listdir(icons_dir):
        path = os.path.join(icons_dir, filename)
        if not os.path.isfile(path):
            continue
        data = extract_yaml_front_matter(path)
        if not data:
            continue
        categories = data.get('categories')
        if categories is None:
            print(f'WARNING: No categories in {filename}')
            categories = []
        elif isinstance(categories, str):
            categories = [categories]
        tags = data.get('tags')
        if tags is None:
            print(f'WARNING: No tags in {filename}')
            tags = []
        elif isinstance(tags, str):
            tags = [tags]
        # Clean up entries
        categories = [str(cat) for cat in categories if cat not in [None, "", []]]
        tags = [str(tag) for tag in tags if tag not in [None, "", []]]
        for cat in categories:
            category_files[cat].append(filename[:-3])
        for tag in tags:
            tag_files[tag].append(filename[:-3])

    print('\nCategory counts:')
    for cat, files in sorted(category_files.items(), key=lambda item: len(item[1]), reverse=True):
        count = len(files)
        if count <= 5:
            files_list = ', '.join(files)
            print(f"{cat:27} {count} {files_list}")
        else:
            print(f"{cat:27} {count}")

    print('\nTag counts:')
    for tag, files in sorted(tag_files.items(), key=lambda item: len(item[1]), reverse=True):
        count = len(files)
        if count <= 5:
            files_list = ', '.join(files)
            print(f"{tag:19} {count} {files_list}")
        else:
            print(f"{tag:19} {count}")


if __name__ == "__main__":
    main()
