from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
# from english_teacher.types.story import Keyword, Story, Title, Level, StoryData

# Uncomment the following line to use an example of a custom tool
# from english_teacher.tools.custom_tool import MyCustomTool

# Check our tools documentations for more information on how to use them
# from crewai_tools import SerperDevTool

@CrewBase
class StoryGeneratorCrew():
	"""StoryGenerator crew"""

	@agent
	def story_creator(self) -> Agent:
		return Agent(
			config=self.agents_config['story_creator'],
			# tools=[MyCustomTool()], # Example of custom tool, loaded on the beginning of file
			verbose=True
		)

	@agent
	def translator(self) -> Agent:
		return Agent(
			config=self.agents_config['translator'],
			verbose=True
		)

	@task
	def story_generation_task(self) -> Task:
		return Task(
			config=self.tasks_config['story_generation_task'],
		)

	@task
	def translation_and_keyword_extraction_task(self) -> Task:
		return Task(
			config=self.tasks_config['translation_and_keyword_extraction_task'],
		)

	@crew
	def crew(self) -> Crew:
		"""Creates the EnglishTeacher crew"""
		return Crew(
			agents=self.agents, # Automatically created by the @agent decorator
			tasks=self.tasks, # Automatically created by the @task decorator
			process=Process.sequential,
			verbose=True,
			# output_pydantic=StoryData
			# process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
		)